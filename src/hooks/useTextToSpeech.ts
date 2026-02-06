import { useState, useRef, useCallback } from 'react';
import axios from 'axios';

export interface TTSOptions {
  voiceId?: string;
  model?: string;
  voiceSettings?: {
    stability: number;
    similarity_boost: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
}

// Default ElevenLabs settings
const DEFAULT_VOICE_ID = 'XwswTF89pZKbWpVX4A7R'; // Custom voice
const DEFAULT_MODEL = 'eleven_turbo_v2_5'; // Fast, high-quality model
const DEFAULT_VOICE_SETTINGS = {
  stability: 0.5,
  similarity_boost: 0.75,
  style: 0.5,
  use_speaker_boost: true,
};

export const useTextToSpeech = (apiKey: string, onSpeechEnd?: () => void) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fallback to browser's Speech Synthesis API
  const speakFallback = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.15;  // Faster for more energy and excitement
      utterance.pitch = 1.25;  // Higher pitch for enthusiastic delivery
      utterance.volume = 0.3;  // Low volume for background narration

      utterance.onend = () => {
        setIsPlaying(false);
        if (onSpeechEnd) onSpeechEnd();
      };

      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
      return true;
    }
    return false;
  }, [onSpeechEnd]);

  const speak = useCallback(async (text: string, options?: TTSOptions) => {
    // Stop any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Cancel browser speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Abort any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // If no API key provided, use browser fallback
    if (!apiKey) {
      console.log('No ElevenLabs API key provided, using browser TTS fallback');
      return speakFallback(text);
    }

    const voiceId = options?.voiceId || DEFAULT_VOICE_ID;
    const model = options?.model || DEFAULT_MODEL;
    const voiceSettings = options?.voiceSettings || DEFAULT_VOICE_SETTINGS;

    setIsLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          text,
          model_id: model,
          voice_settings: voiceSettings,
        },
        {
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
          },
          responseType: 'arraybuffer',
          signal: abortControllerRef.current.signal,
        }
      );

      // Convert response to audio blob and play
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
        if (onSpeechEnd) onSpeechEnd();
      };

      audio.onerror = (e) => {
        console.error('Audio playback error:', e);
        setIsPlaying(false);
        setIsLoading(false);
        URL.revokeObjectURL(audioUrl);
        // Fall back to browser TTS on error
        speakFallback(text);
      };

      setIsLoading(false);
      setIsPlaying(true);
      await audio.play();
      return true;

    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('ElevenLabs request cancelled');
      } else {
        console.error('ElevenLabs TTS error:', error);
        // Fall back to browser TTS on error
        speakFallback(text);
      }
      setIsLoading(false);
      return false;
    }
  }, [apiKey, speakFallback, onSpeechEnd]);

  const stop = useCallback(() => {
    // Stop audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Stop browser speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Abort pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  return { speak, stop, isPlaying, isLoading };
};