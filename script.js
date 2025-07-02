document.getElementById('navToggle').onclick = function() {
    document.querySelector('.navbar ul').classList.toggle('active');
};

   const navLinks = document.getElementById("navLinks");

    function showMenu() {
      navLinks.style.right = "0";
    }

    function hideMenu() {
      navLinks.style.right = "-200px";
    }

    // ...existing code...

const MAX_COMMENTS = 3;
const COMMENT_LIFETIME = 12 * 60 * 60 * 1000; // 12 hours in ms

function getComments() {
  const comments = JSON.parse(localStorage.getItem('comments') || '[]');
  const now = Date.now();
  // Remove expired comments
  const validComments = comments.filter(c => now - c.timestamp < COMMENT_LIFETIME);
  localStorage.setItem('comments', JSON.stringify(validComments));
  return validComments;
}

function addComment(text) {
  let comments = getComments();
  if (comments.length >= MAX_COMMENTS) {
    alert('Only 3 comments allowed at a time.');
    return;
  }
  comments.push({ text, timestamp: Date.now() });
  localStorage.setItem('comments', JSON.stringify(comments));
  renderComments();
}

function renderComments() {
  const comments = getComments();
  const container = document.getElementById('comments');
  container.innerHTML = '';
  comments.forEach(c => {
    const div = document.createElement('div');
    div.textContent = c.text;
    container.appendChild(div);
  });
}

// Call renderComments() on page load
document.addEventListener('DOMContentLoaded', renderComments);

// Example usage: addComment('Your comment here');

// 
  const navLinks = document.getElementById("navLinks");
    function showMenu() { navLinks.style.right = "0"; }
    function hideMenu() { navLinks.style.right = "-200px"; }

    function postComment() {
      const commentInput = document.getElementById('commentInput');
      const commentText = commentInput.value.trim();
      if (commentText !== '') {
        const commentBox = document.createElement('div');
        commentBox.className = 'posted-email';
        commentBox.innerHTML = `<h3>Anonymous</h3><p>${commentText}</p>`;
        document.getElementById('commentsContainer').appendChild(commentBox);
        commentInput.value = '';
      }
    }

    
  const maxComments = 20;
  const storageKey = 'gamingComments';
  const expirationDays = 5;

  // Helper: Get stored comments and filter expired ones
  function getValidComments() {
    const now = Date.now();
    const data = JSON.parse(localStorage.getItem(storageKey)) || [];
    return data.filter(comment => now - comment.timestamp < expirationDays * 24 * 60 * 60 * 1000);
  }


  function saveComments(comments) {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }


  function postComment(event) {
    event.preventDefault();
    const commentText = document.getElementById('commentInput').value.trim();
    if (!commentText) return;

    let comments = getValidComments();

    if (comments.length >= maxComments) {
      comments.shift(); l
    }

    comments.push({
      text: commentText,
      timestamp: Date.now()
    });

    saveComments(comments);
    document.getElementById('commentForm').reset();
    renderComments();
  }

  function renderComments() {
    const container = document.getElementById('commentsGrid');
    container.innerHTML = '';
    const comments = getValidComments();

    comments.forEach(comment => {
      const div = document.createElement('div');
      div.className = 'comment-card';
      div.innerHTML = `
        <h3>Anonymous</h3>
        <p>${comment.text}</p>
      `;
      container.appendChild(div);
    });
  }

  document.getElementById('commentForm').addEventListener('submit', postComment);

  renderComments();
