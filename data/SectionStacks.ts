import { StackCardsProp, StackSectionProps } from "@/types"

// HTML, CSS, JavaScript, Python, SQL
export const sectionStacks: StackSectionProps[] = [
  {
    bgColor: '#D9EEE1',
    title: 'HTML',
    description: 'Web sahifalar tuzish uchun markaplash tili',
    buttons: [
      {
        text: `HTMLni o'rganish`,
        url: '/html',
        bg: '#059862'
      },
      {
        text: `Video Darslar`,
        url: '/videos',
        bg: '#fff4a3'
      },
      {
        text: `HTML Reference`,
        url: '/tags',
        bg: '#282A35'
      },
      {
        text: `Sertifikat olish`,
        url: 'https://campus.w3schools.com/collections/certifications/products/html-certificate',
        bg: "#FFB3BB"
      }
    ],
    buttonBg: '#059862',
    buttonText: "O'zingiz sinab ko'ring",
    codeSnippetText: 'HTMLga Misol:',
    codeSnippet: `
    <!DOCTYPE html>
      <html>
      <head>
      <title>HTML Darsligi</title>
      </head>
      <body>

      <h1>Bu sarlavha</h1>
      <p>Bu paragraf</p>

      </body>
    </html>
    `,
    syntax: 'html',
    href: 'https://www.w3schools.com/html/tryit.asp?filename=tryhtml_default_default'
  },
  {
    bgColor: '#fff4a3',
    title: 'CSS',
    description: 'Web sahifalarni bezash uchun kaskadlash tili',
    buttons: [
      {
        text: `CSSni o'rganish`,
        url: '/css',
        bg: '#059862'
      },
      {
        text: `CSS Reference`,
        url: '/cssref',
        bg: '#282A35'
      },
      {
        text: `Sertifikat olish`,
        url: 'https://campus.w3schools.com/collections/certifications/products/css-certificate',
        bg: "#FFB3BB"
      }
    ],
    buttonBg: '#059862',
    buttonText: "O'zingiz sinab ko'ring",
    codeSnippetText: 'CSSga Misol:',
    codeSnippet: `
    body {
      background-color: lightblue;
    }

    h1 {
      color: white;
      text-align: center;
    }

    p {
      font-family: verdana;
    }
    `,
    syntax: 'css',
    href: 'https://www.w3schools.com/css/tryit.asp?filename=trycss_default'
  },
  {
    bgColor: '#0D1721',
    title: 'JavaScript',
    description: 'Web sahifalarni interaktiv qilish uchun dasturlash tili',
    buttons: [
      {
        text: `JavaScriptni o'rganish`,
        url: '/js',
        bg: '#059862'
      },
      {
        text: `JavaScript Reference`,
        url: '/jsref',
        bg: '#E7E9EB'
      },
      {
        text: `Sertifikat olish`,
        url: 'https://campus.w3schools.com/collections/certifications/products/javascript-certificate',
        bg: "#FFB3BB"
      }
    ],
    buttonBg: '#059862',
    buttonText: "O'zingiz sinab ko'ring",
    codeSnippetText: 'JavaScriptga Misol:',
    codeSnippet: `
    <button onclick="myFunction()">Meni Bosib ko'r!</button>

    <script>
    function myFunction() {
      let x = document.getElementById("demo");
      x.style.fontSize = "25px";
      x.style.color = "red";
    }
    </script>
    `,
    syntax: 'html',
    href: "https://www.w3schools.com/js/tryit.asp?filename=tryjs_default"
  },
  {
    bgColor: '#F3ECEA',
    title: 'Python',
    description: 'Dasturlash tili',
    buttons: [
      {
        text: `Pythonni o'rganish`,
        url: '/python',
        bg: '#059862'
      },
      {
        text: `Python Reference`,
        url: '/python/python_reference',
        bg: '#282A35'
      },
      {
        text: `Sertifikat olish`,
        url: 'https://campus.w3schools.com/collections/certifications/products/python-certificate',
        bg: "#FFB3BB"
      }
    ],
    buttonBg: '#059862',
    buttonText: "O'zingiz sinab ko'ring",
    codeSnippetText: 'Pythonga Misol:',
    codeSnippet: `
    if 5 > 2:
      print("Besh ikki dan katta!")






    `,
    syntax: 'python',
    href: "https://www.w3schools.com/python/trypython.asp?filename=demo_indentation"
  },
  {
    bgColor: '#96D4D4',
    title: 'SQL',
    description: 'Ma\'lumotlar bazasi bilan ishlash uchun tili',
    buttons: [
      {
        text: `SQLni o'rganish`,
        url: '/sql',
        bg: '#059862'
      },
      {
        text: `SQL Reference`,
        url: '/sql/sql_ref_keywords',
        bg: '#282A35'
      },
      {
        text: `Sertifikat olish`,
        url: 'https://campus.w3schools.com/collections/certifications/products/sql-certificate',
        bg: "#FFB3BB"
      }
    ],
    buttonBg: '#059862',
    buttonText: "O'zingiz sinab ko'ring",
    codeSnippetText: 'SQLga Misol:',
    codeSnippet: `
    SELECT * FROM Mijozlar
    WHERE Davlat='Mexika';






    `,
    syntax: 'sql',
    href: "https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_where"
  }
];

// PHP, jQuery, Java, C++, w3.css, Bootstrap
export const stackCards: StackCardsProp[] = [
  { 
    bgColor: '#FFC0C7',
    title: 'PHP',
    description: 'Web serverga asoslangan dasturlash tili',
    button: {
      text: 'PHPni o\'rganish',
      url: '/php',
      bg: '#282A35'
    }
  },
  {
    bgColor: '#FFF4A3',
    title: 'jQuery',
    description: 'Web sahifalar tuzish uchun JavaScript kutubxona',
    button: {
      text: 'jQueryni o\'rganish',
      url: '/jquery',
      bg: '#282A35'
    }
  },
  {
    bgColor: '#F3ECEA',
    title: 'Java',
    description: 'Dasturlash tili',
    button: {
      text: 'Javani o\'rganish',
      url: '/java',
      bg: '#282A35'
    }
  },
  {
    bgColor: '#F3ECEA',
    title: 'C++',
    description: 'Dasturlash tili',
    button: {
      text: 'C++ni o\'rganish',
      url: '/cpp',
      bg: '#282A35'
    }
  },
  {
    bgColor: '#96D4D4',
    title: 'W3.CSS',
    description: 'Web sahifalar tuzish uchun tezroq va yaxshiroq CSS kutubxona',
    button: {
      text: 'W3.CSSni o\'rganish',
      url: '/w3css',
      bg: '#282A35'
    }
  },
  {
    bgColor: '#E7E9EB',
    title: 'Bootstrap',
    description: 'Web sahifalar dizaynini yaxshiroq qilish uchun uchun CSS kutubxona',
    button: {
      text: 'Bootstrapni o\'rganish',
      url: '/bootstrap',
      bg: '#282A35'
    }
  } 
];

// C, C#
export const StackCardsLink: StackCardsProp[] = [
  {
    bgColor: '#FFC0C7',
    title: 'C',
    url: '/c',
  },
  {
    bgColor: '#FFF4A3',
    title: 'C#',
    url: '/csharp',
  },
  {
    bgColor: '#F3ECEA',
    title: 'R',
    url: '/r',
  },
  {
    bgColor: '#96D4D4',
    title: 'Kotlin',
    url: '/kotlin',
  },
  {
    bgColor: '#E7E9EB',
    title: 'NodeJS',
    url: '/nodejs',
  },
  {
    bgColor: '#FFC0C7',
    title: 'React',
    url: '/react',
  },
  {
    bgColor: '#FFF4A3',
    title: 'JSON',
    url: '/json',
  },
  {
    bgColor: '#96D4D4',
    title: 'Vue',
    url: '/vue',
  },
  {
    bgColor: '#E7E9EB',
    title: 'MySQL',
    url: '/mysql',
  },
  {
    bgColor: '#FFC0C7',
    title: 'XML',
    url: '/xml',
  },
  {
    bgColor: '#FFF4A3',
    title: 'Sass',
    url: '/sass',
  },
  {
    bgColor: '#FFC0C7',
    title: 'Ikonkalar',
    url: '/icons',
  },
  {
    bgColor: '#FFF4A3',
    title: 'RWD',
    url: '/css/css_rwd_intro',
  },
  {
    bgColor: '#E7E9EB',
    title: 'Grafikalar',
    url: '/graphics',
  },
  {
    bgColor: '#FFC0C7',
    title: 'SVG',
    url: '/graphics/svg_intro',
  },
  {
    bgColor: '#FFF4A3',
    title: 'Canvas',
    url: '/graphics/canvas_intro',
  },
  {
    bgColor: '#E7E9EB',
    title: 'Raspberry Pi',
    url: '/nodejs/nodejs_raspberrypi',
  },
  {
    bgColor: '#FFF4A3',
    title: 'Kiber Xavfsizlik',
    url: '/cybersecurity',
  },
  {
    bgColor: '#E7E9EB',
    title: 'Ranglar',
    url: '/colors',
  },
  {
    bgColor: '#96D4D4',
    title: 'Git',
    url: '/git',
  },
  {
    bgColor: '#E7E9EB',
    title: 'Matplotlib',
    url: '/python/matplotlib_intro',
  },
  {
    bgColor: '#E7E9EB',
    title: 'NumPy',
    url: '/python/numpy',
  },
  {
    bgColor: '#FFF4A3',
    title: 'Pandas',
    url: '/python/pandas',
  },
  {
    bgColor: '#E7E9EB',
    title: 'SciPy',
    url: '/python/scipy',
  },
  {
    bgColor: '#FFF4A3',
    title: 'ASP',
    url: '/asp',
  },
  {
    bgColor: '#E7E9EB',
    title: 'AngularJS',
    url: '/angular',
  },
  {
    bgColor: '#FFF4A3',
    title: 'AppML',
    url: '/appml',
  },
  {
    bgColor: '#E7E9EB',
    title: 'Go',
    url: '/go',
  },
  {
    bgColor: '#FFF4A3',
    title: 'TypeScript',
    url: '/typescript',
  },
  {
    bgColor: '#E7E9EB',
    title: 'Django',
    url: '/django',
  },
  {
    bgColor: '#FFF4A3',
    title: 'MongoDB',
    url: '/mongodb',
  },
  {
    bgColor: '#E7E9EB',
    title: 'Statistikalar',
    url: '/statistics',
  },
  {
    bgColor: '#FFF4A3',
    title: 'Data Science',
    url: '/datascience',
  },
  {
    bgColor: '#E7E9EB',
    title: 'Yozish tezligi',
    url: '/typingtest',
  },
  {
    bgColor: '#FFF4A3',
    title: 'Qanday qilinadi ?',
    url: '/howto',
  },
  {
    bgColor: '#E7E9EB',
    title: 'Kod O\'yini',
    url: '/codegame',
  },
  {
    bgColor: '#FFF4A3',
    title: 'Maydon',
    url: '/spaces',
  },
  {
    bgColor: '#E7E9EB',
    title: 'PostgreSql',
    url: '/postgresql',
  },
  {
    bgColor: '#FFF4A3',
    title: 'Excel',
    url: '/excel',
  },
  {
    bgColor: '#E7E9EB',
    title: 'DSA - Data Structures and Algorithms',
    url: '/dsa',
  },
  {
    bgColor: '#FFF4A3',
    title: 'Mashinani o\'qitish',
    url: '/machinelearning',
  },
  {
    bgColor: '#E7E9EB',
    title: 'Suniy Intellekt',
    url: '/ai',
  },
];