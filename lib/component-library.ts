// Komponentlar kutubxonasi
export const ComponentLibrary = [
  {
    id: 'code-snippet',
    label: 'Kod snippeti',
    icon: '📝',
    propTypes: {
      language: {
        type: 'select',
        options: ['javascript', 'typescript', 'html', 'css', 'python', 'java']
      },
      code: {
        type: 'textarea'
      },
      showLineNumbers: {
        type: 'boolean'
      }
    },
    defaultProps: {
      language: 'javascript',
      code: 'console.log("Hello, World!");',
      showLineNumbers: true
    }
  },
  {
    id: 'interactive-quiz',
    label: 'Quiz test',
    icon: '❓',
    propTypes: {
      question: {
        type: 'text'
      },
      answers: {
        type: 'json'
      },
      correctAnswer: {
        type: 'number'
      }
    },
    defaultProps: {
      question: 'JavaScript qaysi tip tilga kiradi?',
      answers: JSON.stringify(['Static', 'Dynamic', 'Compiled', 'Procedural']),
      correctAnswer: 1
    }
  },
  {
    id: 'image-example',
    label: 'Rasm',
    icon: '🖼️',
    propTypes: {
      src: {
        type: 'text'
      },
      alt: {
        type: 'text'
      },
      caption: {
        type: 'text'
      }
    },
    defaultProps: {
      src: '/examples/image.jpg',
      alt: 'Misol rasm',
      caption: 'Rasm haqida ma\'lumot'
    }
  },
  {
    id: 'alert-box',
    label: 'Ogohlantirish',
    icon: '⚠️',
    propTypes: {
      type: {
        type: 'select',
        options: ['info', 'warning', 'error', 'success']
      },
      title: {
        type: 'text'
      },
      message: {
        type: 'textarea'
      }
    },
    defaultProps: {
      type: 'info',
      title: 'E\'tibor bering',
      message: 'Bu muhim ma\'lumot sizga foydali bo\'lishi mumkin.'
    }
  },
  {
    id: 'live-demo',
    label: 'Jonli misol',
    icon: '🧪',
    propTypes: {
      htmlCode: {
        type: 'textarea'
      },
      cssCode: {
        type: 'textarea'
      },
      jsCode: {
        type: 'textarea'
      },
      height: {
        type: 'number'
      }
    },
    defaultProps: {
      htmlCode: '<div id="demo">Hello World</div>',
      cssCode: '#demo { color: blue; }',
      jsCode: 'console.log("Demo loaded");',
      height: 300
    }
  },
  {
    id: 'table-data',
    label: 'Jadval',
    icon: '📊',
    propTypes: {
      headers: {
        type: 'json'
      },
      rows: {
        type: 'json'
      },
      caption: {
        type: 'text'
      }
    },
    defaultProps: {
      headers: JSON.stringify(['Nomi', 'Tavsifi', 'Misol']),
      rows: JSON.stringify([
        ['String', 'Matn qiymati', '"Hello"'],
        ['Number', 'Raqamli qiymat', '42'],
        ['Boolean', 'Mantiqiy qiymat', 'true']
      ]),
      caption: 'JavaScript ma\'lumot turlari'
    }
  }
]; 