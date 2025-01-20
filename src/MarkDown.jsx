import Markdown from 'marked-react';

export function MarkDownEditor({ handleOpenDialog, setCurrentDocument, currentDocument, documentList, setDocumentList, setMarkdown, showPreview, setShowPreview, markdown, setIsMenuOpen, isMenuOpen }) {

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
    e.preventDefault();
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

  const screenWidth = window.innerWidth;
  const isSmallScreen = screenWidth < 768;

  return (
    <>
      <div className={`header-modal ${isMenuOpen ? "grid" : "none"}`}>
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
      <div className={`header ${isMenuOpen ? "header-open" : "menu-close"}`}>
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
              <div className="file-info">
                <span className='doc-name-tablet'>Document Name</span>
                <p>{currentDocument ? currentDocument.name : "welcome.md"}</p>
              </div>
            </div>
            <div className="file-delete-save">
              <div className="delete-btn">
                <img onClick={handleOpenDialog} src="/img/delete-header-btn.svg" alt="Delete File Icon" />
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
              {isSmallScreen ? (
                <label className='small-screen-label'>
                  {showPreview ? <span>PREVIEW
                    <img
                      src={showPreview ? "/img/close-eye-icon.svg" : "/img/open-eye-icon.svg"}
                      alt=""
                      onClick={togglePreview}
                    />
                  </span> : <span>MARKDOWN
                    <img
                      src={showPreview ? "/img/close-eye-icon.svg" : "/img/open-eye-icon.svg"}
                      alt=""
                      onClick={togglePreview}
                    /></span>}
                </label>
              ) : (
                <label>
                  {showPreview ? <span className='tablet-titles'>PREVIEW
                    <img
                      src={showPreview ? "/img/close-eye-icon.svg" : "/img/open-eye-icon.svg"}
                      alt=""
                      onClick={togglePreview}
                    />
                  </span> : <div className='titles'><span>MARKDOWN</span><span>PREVIEW
                    <img
                      src={showPreview ? "/img/close-eye-icon.svg" : "/img/open-eye-icon.svg"}
                      alt=""
                      onClick={togglePreview}
                    />
                  </span></div>}
                </label>
              )}
            </div>
            <div className="text-container">
              {isSmallScreen ? (
                <>
                  {!showPreview ? (
                    <textarea
                      className="mobile-textarea"
                      name="content"
                      onChange={handleChange}
                      value={markdown}
                      placeholder="Type some markdown here..."
                    ></textarea>
                  ) : (
                    <div className="preview-container">
                      <Markdown>{markdown}</Markdown>
                    </div>
                  )}
                </>
              ) : (

                showPreview ? (
                  <div className="preview-container border-none">
                    <Markdown>{markdown}</Markdown>
                  </div>
                ) : (

                  <div className='bigscreen' >
                    <textarea
                      className="mobile-textarea"
                      name="content"
                      onChange={handleChange}
                      value={markdown}
                      placeholder="Type some markdown here..."
                    ></textarea>
                    <div className="preview-container">
                      <Markdown>{markdown}</Markdown>
                    </div>
                  </div>
                )
              )}
            </div>
          </form>
        </div >
      </div >
    </>
  );
}

export function DeleteDialog({ dialogRef, handleDelete, cancelDelete }) {
  return (
    <>
      <dialog ref={dialogRef}>
        <div className="modal-overlay">
          <div className="dialog-delete">
            <h3>Delete this document?</h3>
            <p>Are you sure you want to delete this document and its contents? This action cannot be reversed.</p>
            <button onClick={handleDelete}>Confirm & Delete</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      </dialog>
    </>
  );
}