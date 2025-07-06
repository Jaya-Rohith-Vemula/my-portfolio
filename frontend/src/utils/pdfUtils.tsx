import * as pdfjsLib from "pdfjs-dist";
import type {
  TextItem,
  TextMarkedContent,
} from "pdfjs-dist/types/src/display/api";

pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;

function isTextItem(item: TextItem | TextMarkedContent): item is TextItem {
  return (item as TextItem).str !== undefined;
}

export const extractText = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = async function () {
      try {
        const typedarray = new Uint8Array(this.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let extractedText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const annotations = await page.getAnnotations();
          const lines: Record<number, string[]> = {};

          textContent.items.forEach((item) => {
            if (isTextItem(item)) {
              const y = Math.floor(item.transform[5]);
              if (!lines[y]) lines[y] = [];
              lines[y].push(item.str);
            }
          });

          const sortedY = Object.keys(lines)
            .map(Number)
            .sort((a, b) => b - a);

          const pageText = sortedY.map((y) => lines[y].join(" ")).join("\n");
          extractedText += pageText + "\n\n";

          annotations.forEach((annotation) => {
            if (annotation.subtype === "Link" && annotation.url) {
              extractedText += `[Link: ${annotation.url}]\n`;
            }
          });
        }
        resolve(extractedText);
      } catch (error) {
        reject(error);
      }
    };
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsArrayBuffer(file);
  });
};
