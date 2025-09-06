// src/features/pdf-viewer/services/speechService.ts
export const speakText = (text: string, lang: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(voice => voice.lang === lang);
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  utterance.rate = 0.9;
  utterance.pitch = 1;
  
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};