// src/features/pdf-viewer/services/translationService.ts
import axios from 'axios';

export const translateToArabic = async (text: string) => {
  try {
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`
    );
    return response.data[0][0][0];
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
};