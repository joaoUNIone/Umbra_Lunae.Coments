document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('commentForm');
  const commentsList = document.getElementById('commentsList');

  // Carregar comentários do LocalStorage
  const savedComments = JSON.parse(localStorage.getItem('comments')) || [];

  function renderComments() {
    commentsList.innerHTML = '';
    savedComments.forEach(({name, comment}) => {
      const commentEl = document.createElement('div');
      commentEl.classList.add('comment', 'fade-in');
      commentEl.innerHTML = `
        <strong>${escapeHtml(name)}</strong>
        <p>${escapeHtml(comment)}</p>
      `;
      commentsList.appendChild(commentEl);
    });
  }

  // Função para evitar código malicioso (XSS)
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  renderComments();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('#name');
    const commentInput = form.querySelector('#comment');
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (!name || !comment) return;

    // Adicionar novo comentário no array
    savedComments.push({name, comment});
    localStorage.setItem('comments', JSON.stringify(savedComments));

    // Renderiza novamente os comentários
    renderComments();

    // Limpar campos
    nameInput.value = '';
    commentInput.value = '';
  });
});
