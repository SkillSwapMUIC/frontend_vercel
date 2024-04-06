export function wrapLatexContent(latexContent) {
    if (!latexContent.startsWith('$$')) {
        latexContent = `$$${latexContent}`;
    }
    if (!latexContent.endsWith('$$')) {
        latexContent += '$$';
    }
    return latexContent;
}
