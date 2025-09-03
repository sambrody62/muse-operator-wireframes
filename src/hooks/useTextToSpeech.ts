import { useState, useRef, useCallback } from 'react';

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

    // Always use fallback since we removed axios
    console.log('Using browser TTS fallback');
    return speakFallback(text);
  }, [speakFallback]);

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