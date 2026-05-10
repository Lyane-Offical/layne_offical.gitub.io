document.addEventListener('DOMContentLoaded', () => {
  updateTime();
  setInterval(updateTime, 1000);
  
  setupCursorTracking();
  setupCrosshair();
  setupCodeRain();
  setupNavigation();
  setupSendButton();
  setupTerminalAnimation();
  setupCopyEmail();
  setupProjectExpand();
});

function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('time-display').textContent = `${hours}:${minutes}:${seconds}`;
}

function setupCursorTracking() {
  document.addEventListener('mousemove', (e) => {
    const x = String(Math.floor(e.clientX)).padStart(4, '0');
    const y = String(Math.floor(e.clientY)).padStart(4, '0');
    document.getElementById('cursor-x').textContent = x;
    document.getElementById('cursor-y').textContent = y;
  });
}

function setupCrosshair() {
  const crosshair = document.querySelector('.cursor-crosshair');
  
  document.addEventListener('mousemove', (e) => {
    crosshair.style.transform = `translate(${e.clientX - 25}px, ${e.clientY - 25}px)`;
    
  });
  
  const buttons = document.querySelectorAll('button, a, .project-link, .project-detail-btn, .copy-btn, .send-btn, .nav-item');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      crosshair.classList.add('on-button');
    });
    btn.addEventListener('mouseleave', () => {
      crosshair.classList.remove('on-button');
    });
  });
}

function setupCodeRain() {
  const container = document.getElementById('code-rain');
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}[]<>/\\|+-=*&^%$#@!~`';
  const columnCount = Math.floor(window.innerWidth / 100);
  const columns = [];
  
  for (let i = 0; i < columnCount; i++) {
    const column = document.createElement('div');
    column.className = 'rain-column';
    
    let text = '';
    const length = Math.floor(Math.random() * 30) + 15;
    for (let j = 0; j < length; j++) {
      text += chars[Math.floor(Math.random() * chars.length)];
    }
    
    column.textContent = text;
    column.style.left = `${i * 100 + Math.random() * 50}px`;
    column.style.animationDuration = `${Math.random() * 15 + 20}s`;
    column.style.animationDelay = `${Math.random() * -20}s`;
    column.style.opacity = Math.random() * 0.4 + 0.3;
    
    columns.push(column);
    container.appendChild(column);
  }
}

function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');
  
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetId) {
          section.classList.add('active');
        }
      });
      
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function setupSendButton() {
  const sendBtn = document.getElementById('send-btn');
  const messageInput = document.getElementById('message-input');
  
  sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
      animateSend(message);
      messageInput.value = '';
    }
  });
  
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendBtn.click();
    }
  });
}

function animateSend(message) {
  const terminalWindow = document.querySelector('.message-terminal');
  const inputWrapper = terminalWindow.querySelector('.message-input-wrapper');
  
  const outputLine = document.createElement('div');
  outputLine.className = 'output-line success';
  outputLine.innerHTML = `<span class="prompt">></span> 消息已发送: "${message}"`;
  
  inputWrapper.insertAdjacentElement('beforebegin', outputLine);
  
  setTimeout(() => {
    outputLine.remove();
  }, 3000);
}

function setupTerminalAnimation() {
  const terminalOutput = document.getElementById('terminal-output');
  const lines = terminalOutput.querySelectorAll('.output-line');
  
  lines.forEach((line, index) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-20px)';
    line.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateX(0)';
    }, index * 200);
  });
}

document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-item');
  
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
    
    if (isVisible) {
      section.classList.add('active');
      
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-target') === section.id) {
          item.classList.add('active');
        }
      });
    }
  });
});

function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

const skillFills = document.querySelectorAll('.skill-fill');
skillFills.forEach((fill) => {
  const width = fill.style.width;
  fill.style.width = '0%';
  
  setTimeout(() => {
    fill.style.width = width;
  }, 500);
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  
  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    card.style.transition = 'all 0.6s ease';
  }, index * 200);
});

function showInfoMessage(message, type = 'info') {
  const infoBar = document.getElementById('system-info-bar');
  const infoMessage = document.getElementById('info-message');
  
  infoBar.className = `system-info-bar ${type}`;
  infoMessage.textContent = message;
  
  infoBar.style.opacity = '1';
  
  setTimeout(() => {
    infoBar.style.opacity = '0.6';
  }, 2000);
}

function setupCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailValue = document.getElementById('email-value');
  const tooltip = document.getElementById('copy-tooltip');
  
  const copyToClipboard = async () => {
    const email = '2697863232@qq.com';
    try {
      await navigator.clipboard.writeText(email);
      
      copyBtn.classList.add('copied');
      tooltip.classList.add('show');
      showInfoMessage('邮箱已复制到剪贴板', 'success');
      
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        tooltip.classList.remove('show');
      }, 2000);
    } catch (err) {
      console.error('复制失败:', err);
      showInfoMessage('复制失败，请重试', 'error');
    }
  };
  
  copyBtn.addEventListener('click', copyToClipboard);
  emailValue.addEventListener('click', copyToClipboard);
}

function setupProjectExpand() {
  const projectCards = document.querySelectorAll('.project-card');
  const detailBtns = document.querySelectorAll('.project-detail-btn');
  
  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectCard = btn.closest('.project-card');
      
      if (projectCard.classList.contains('expanded')) {
        projectCard.classList.remove('expanded');
      } else {
        projectCards.forEach(card => card.classList.remove('expanded'));
        projectCard.classList.add('expanded');
      }
    });
  });
  
  const closeBtns = document.querySelectorAll('.expand-close');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectCard = btn.closest('.project-card');
      projectCard.classList.remove('expanded');
    });
  });
}