import './App.css';
import React, { useRef, useState } from 'react';
import { MarkDownEditor, DeleteDialog } from './MarkDown.jsx';

const defaultMarkdown = `
  # Welcome to Markdown

  Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

  ## How to use this?

  1. Write markdown in the markdown editor window
  2. See the rendered markdown in the preview window

  ### Features

  - Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists
  - Name and save the document to access again later
  - Choose between Light or Dark mode depending on your preference

  > This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).

  #### Headings

  To create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.

  ##### Lists

  You can see examples of ordered and unordered lists above.

  ###### Code Blocks

  This markdown editor allows for inline-code snippets, like this: \`<p>I'm inline</p>\`. It also allows for larger code blocks like this:

  \`\`\`
  <main>
    <h1>This is a larger code block</h1>
  </main>
  \`\`\`
`;

function App() {
  const dialogRef = useRef();
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [showPreview, setShowPreview] = useState(false); // önizleme olayı
  const [isMenuOpen, setIsMenuOpen] = useState(false); // hamburger menü
  const [documentList, setDocumentList] = useState([
    { name: "welcome.md", date: "01 April 2022", id: crypto.randomUUID() },
    { name: "untitled-document.md", date: "26 December 2022", id: crypto.randomUUID() }
  ]);
  const [currentDocument, setCurrentDocument] = useState("");

  const handleOpenDialog = () => {
    dialogRef.current.showModal(); // modalı aç
  };

  const handleDelete = () => {
    if (currentDocument) {
      const updatedList = documentList.filter(doc => doc.id !== currentDocument.id);
      setDocumentList(updatedList);
      setMarkdown("");
      setCurrentDocument(null);
    }
    dialogRef.current.close(); // modalı kapat
  };

  const cancelDelete = () => {
    dialogRef.current.close(); // modalı kapat
  };

  return (
    <>
      <div className={`container ${isMenuOpen ? "menu-open" : "menu-close"}`}>
        <MarkDownEditor
          documentList={documentList}
          setDocumentList={setDocumentList}
          currentDocument={currentDocument}
          setCurrentDocument={setCurrentDocument}
          setMarkdown={setMarkdown}
          setShowPreview={setShowPreview}
          markdown={markdown}
          showPreview={showPreview}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          handleOpenDialog={handleOpenDialog}
        />
        <DeleteDialog dialogRef={dialogRef}
          handleDelete={handleDelete}
          cancelDelete={cancelDelete} />
      </div>
    </>
  )
}

export default App;