import Markdown from 'marked-react';

export function MarkDownEditor({ setCurrentDocument, currentDocument, documentList, setDocumentList, setMarkdown, showPreview, setShowPreview, markdown, setIsMenuOpen, isMenuOpen }) {

  function togglePreview() {
    setShowPreview((prevState) => !prevState);
  }

  function handleChange(e) {
    setMarkdown(e.target.value);
  }

  function hamburgerMenu() {
    setIsMenuOpen((prevState) => !prevState);
  }

  function handleNewDocument() {
    const newDocument = {
      name: "untitled-document.md",
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString(),
    };
    setDocumentList((prevList) => [...prevList, newDocument]);
  }

  function openDocument(doc) {
    console.log(doc);
    setMarkdown(doc.content || "");
    setIsMenuOpen(false);
    setCurrentDocument(doc);
  }

  function updatedDocument(e) {
    e.preventDefault(); // Sayfanın yenilenmesini önle
    const form = new FormData(e.target);
    const formObj = Object.fromEntries(form);
    setDocumentList((prevList) =>
      prevList.map((doc) =>
        doc.id === currentDocument.id
          ? { ...doc, ...formObj }
          : doc
      )
    );
  }

  function deleteDocument(id) {
    if (id !== null) {
      const currentList = documentList.filter(x => x.id !== id)
      setDocumentList(currentList);
      setMarkdown("");
    }
  }

  return (
    <>
      <div className="header-modal" style={{ display: isMenuOpen ? "grid" : "none" }}>
        <div className="hamburger-menu-overlay">
          <div className="menu-header">
            <h1>MARKDOWN</h1>
          </div>
          <div className="menu-content">
            <h2>MY DOCUMENTS</h2>
            <button onClick={handleNewDocument}>+ New Document</button>
          </div>
          <div className="document-list">
            <ul>
              {documentList.map((doc) => (
                <li key={doc.id} onClick={() => openDocument(doc)}>
                  <img src="/img/file-header-icon.svg" alt="File Icon" />
                  <div className="document-info">
                    <span>{doc.date}</span>
                    <p>{doc.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="header-content">
          <div className="hamburger-menu">
            <img
              src={isMenuOpen ? "/img/hamburger-menu-close.svg" : "/img/hamburger-menu.svg"}
              alt="Hamburger Menu"
              onClick={hamburgerMenu}
            />
          </div>
          <div className="header-inner">
            <div className="file-content">
              <img src="/img/file-header-icon.svg" alt="File Icon" />
              <p>{currentDocument ? currentDocument.name : "welcome.md"}</p>
            </div>
            <div className="file-delete-save">
              <div className="delete-btn">
                <img onClick={() => deleteDocument(currentDocument.id)} src="/img/delete-header-btn.svg" alt="Delete File Icon" />
              </div>
              <button type="submit" form="markdownForm" className="save-btn">
                <img src="/img/save-header-btn.svg" alt="Save File Icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="markdown-container">
          <form id="markdownForm" onSubmit={updatedDocument}>
            <div className="markdown-preview-area">
              <label>{showPreview ? "PREVIEW" : "MARKDOWN"}</label>
              <img
                src={showPreview ? "/img/close-eye-icon.svg" : "/img/open-eye-icon.svg"}
                alt=""
                onClick={togglePreview}
              />
            </div>
            <div className="text-container">
              {!showPreview ? (
                <textarea
                  className="mobile-textarea"
                  name="content"
                  onChange={handleChange}
                  value={markdown}
                  rows="30"
                  cols="20"
                  placeholder="Type some markdown here..."
                ></textarea>
              ) : (
                <div className="preview-container">
                  <Markdown>{markdown}</Markdown>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
