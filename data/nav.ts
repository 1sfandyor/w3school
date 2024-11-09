import React from 'react';
import { v4 as id } from "uuid";

import { faCaretDown, faCartShopping, faCode, faGraduationCap, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { MenuItem } from "@/types";

export const nav = [
  { id: id(), title: "Darsliklar" },
  { id: id(), title: "Mashqlar" },
  { id: id(), title: "Sertifikatlar" },
  { id: id(), title: "Xizmatlar" },
];

export const links = [
  
  { 
    id: id(), 
    title: "Plus", 
    path: "/plus", 
    icons: faWandMagicSparkles 
  },
  {
    id: id(),
    title: "O'qituvchilarga",
    path: "/academy/teachers",
    icons: faGraduationCap,
  },
  
  { id: id(),
    title: "Spaces",
    path: "/spaces",
    icons: faCode
  },

  { 
    id: id(), 
    title: "Sertifikat olish", 
    path: "https://campus.w3schools.com/collections/course-catalog", 
    icons: faCartShopping 
  },
];

export const menuItems = [
  { id: id(), title: "Darsliklar", icon: faCaretDown},
  { id: id(), title: "Mashqlar", icon: faCaretDown},
  { id: id(), title: "Sertifikatlar", icon: faCaretDown},
  { id: id(), title: "Xizmatlar", icon: faCaretDown},
  { id: id(), title: "Space", icon: faCode},
  { id: id(), title: "Sertifikat olish", icon: faCartShopping},
  { id: id(), title: "Plus", icon: faWandMagicSparkles },
  { id: id(), title: "Akademiya" },
];

export const menuData: Record<string, MenuItem> = {
  Darsliklar: {
    title: "Darsliklar",
    items: [
      {
        name: "HTML va CSS",
        links: [
          { text: "HTML", url: "/html", subLinks: [
            {
              text: "Darsliklar",
              url: "/html"
            },
            {
              text: "Ma'lumotnoma",
              url: "/tags"
            }
            ]
          },
          { text: "CSS", url: "/css", subLinks: [
            {
              text: "Darsliklar",
              url: "/css"
            },
            {
              text: "Ma'lumotnoma",
              url: "/cssref"
            }
            ]
          },
          { text: "RWD", url: "/rwd", subLinks: [
            {
              text: "Darsliklar",
              url: "/css/css-rwd-intro"
            },
            ]
          },
          { text: "Bootstrap", url: "/bootstrap", subLinks: [
            {
              text: "Umumlashgan",
              url: "/bootstrap/bootstrap-ver"
            }
            ]
          },
          { text: "W3.CSS", url: "/w3css", subLinks: [
            {
              text: "Darsliklar",
              url: "/w3css"
            },
            {
              text: "Ma'lumotnoma",
              url: "/w3css/w3css_references"
            }
            ]
          },
          { text: "Sass", url: "/sass", subLinks: [
            {
              text: "Darsliklar",
              url: "/sass"
            },
            {
              text: "Ma'lumotnoma",
              url: "/sass/sass_functions_string"
            }
            ]
          },
          { text: "Ranglar", url: "/colors", subLinks: [
            {
              text: "Darsliklar",
              url: "/colors"
            },
            {
              text: "Ma'lumotnoma",
              url: "/colors/colors_fs595"
            }
            ]
          },
          { text: "Ikonkalar", url: "/icons", subLinks: [
            {
              text: "Darsliklar",
              url: "/icons"
            },
            {
              text: "Ma'lumotnoma",
              url: "/icons/icons_reference"
            }
            ]
          },
          { text: "SVG", url: "/svg", subLinks: [
            {
              text: "Darsliklar",
              url: "/graphics/svg-intro"
            },
            {
              text: "Ma'lumotnoma",
              url: "/graphics/svg_reference"
            }
            ]
          },
          { text: "Canvas", url: "/canvas", subLinks: [
            {
              text: "Darsliklar",
              url: "/graphics/canvas-intro"
            },
            {
              text: "Ma'lumotnoma",
              url: "/graphics/canvas_reference"
            }
            ]
          },
          { text: "Grafika", url: "/graphics", subLinks: [
            {
              text: "Darsliklar",
              url: "/graphics"
            }
            ]
          },
          { text: "Charset Sets", url: "/charsets", subLinks: [
            {
              text: "Ma'lumotnoma",
              url: "/charsets/charsets"
            }
            ]
          },
          { text: "Qanday qilish", url: "/howto", subLinks: [
            {
              text: "Darsliklar",
              url: "/howto"
            }
            ]
          },
        ]
      },
      {
        name: "JavaScript",
        links: [
          { text: "JavaScript", url: "/js", subLinks: [
            {
              text: "Darsliklar",
              url: "/js"
            },
            {
              text: "Ma'lumotnoma",
              url: "/js/js_ref"
            }
            ]
          },
          { text: "React", url: "/react", subLinks: [
            {
              text: "Darsliklar",
              url: "/react"
            }
            ]
          },
          { text: "jQuery", url: "/jquery", subLinks: [
            {
              text: "Darsliklar",
              url: "/jquery"
            },
            {
              text: "Ma'lumotnoma",
              url: "/jquery/jquery_ref_overview"
            }
            ]
          },
          { text: "Vue", url: "/vue", subLinks: [
            {
              text: "Darsliklar",
              url: "/vue"
            },
            {
              text: "Ma'lumotnoma",
              url: "/vue/vue-ref-builtin-attributes"
            }
            ]
          },
          { text: "AngularJS", url: "/angular", subLinks: [
            {
              text: "Darsliklar",
              url: "/angular"
            },
            {
              text: "Ma'lumotnoma",
              url: "/angular/angular_ref_directives"
            }
            ]
          },
          { text: "JSON", url: "/json", subLinks: [
            {
              text: "Darsliklar",
              url: "/js/js_json_intro"
            },
            {
              text: "Ma'lumotnoma",
              url: "/jsref/jsref_obj_json"
            }
            ]
          },
          { text: "AJAX", url: "/ajax", subLinks: [
            {
              text: "Darsliklar",
              url: "/js/js_ajax_intro"
            }
            ]
          },
          { text: "AppML", url: "/appml", subLinks: [
            {
              text: "Darsliklar",
              url: "/appml"
            },
            {
              text: "Ma'lumotnoma",
              url: "/appml/appml_reference"
            }
            ]
          },
          { text: "W3.JS", url: "/w3js", subLinks: [
            {
              text: "Darsliklar",
              url: "/w3js"
            },
            {
              text: "Ma'lumotnoma",
              url: "/w3js/w3js_reference"
            }
            ]
          },
        ]
      },
      {
        name: "Backend",
        links: [
          { text: "Python", url: "/python", subLinks: [
            {
              text: "Darsliklar",
              url: "/python"
            },
            {
              text: "Ma'lumotnoma",
              url: "/python/python_reference"
            }
            ]
          },
          { text: "SQL", url: "/sql", subLinks: [
            {
              text: "Darsliklar",
              url: "/sql"
            },
            {
              text: "Ma'lumotnoma",
              url: "/sql/sql_ref_keywords"
            }
            ]
          },
          { text: "MySQL", url: "/mysql", subLinks: [
            {
              text: "Darsliklar",
              url: "/mysql"
            },
            {
              text: "Ma'lumotnoma",
              url: "/mysql/mysql_datatypes"
            }
            ]
          },
          { text: "PHP", url: "/php", subLinks: [
            {
              text: "Darsliklar",
              url: "/php"
            },
            {
              text: "Ma'lumotnoma",
              url: "/php/php_ref_overview"
            }
            ]
          },
          { text: "Java", url: "/java", subLinks: [
            {
              text: "Darsliklar",
              url: "/java"
            },
            {
              text: "Ma'lumotnoma",
              url: "/java/java_ref_reference"
            }
            ]
          },
          { text: "C", url: "/c", subLinks: [
            {
              text: "Darsliklar",
              url: "/c"
            },
            {
              text: "Ma'lumotnoma",
              url: "/c/c_ref_reference"
            }
            ]
          },
          { text: "C++", url: "/cpp", subLinks: [
            {
              text: "Darsliklar",
              url: "/cpp"
            },
            {
              text: "Ma'lumotnoma",
              url: "/cpp/cpp_ref_reference"
            }
            ]
          },
          { text: "C#", url: "/cs", subLinks: [
            {
              text: "Darsliklar",
              url: "/cs"
            }
            ]
          },
          { text: "R", url: "/r", subLinks: [
            {
              text: "Darsliklar",
              url: "/r"
            }
            ]
          },
          { text: "Kotlin", url: "/kotlin", subLinks: [
            {
              text: "Darsliklar",
              url: "/kotlin"
            }
            ]
          },
          { text: "Go", url: "/go", subLinks: [
            {
              text: "Darsliklar",
              url: "/go"
            }
            ]
          },
          { text: "Django", url: "/django", subLinks: [
            {
              text: "Darsliklar",
              url: "/django"
            },
            {
              text: "Ma'lumotnoma",
              url: "/django/django_ref_template_tags"
            }
            ]
          },
          { text: "PostgreSQL", url: "/postgresql", subLinks: [
            {
              text: "Darsliklar",
              url: "/postgresql"
            }
            ]
          },
          { text: "TypeScript", url: "/typescript", subLinks: [
            {
              text: "Darsliklar",
              url: "/typescript"
            }
            ]
          },
          { text: "ASP", url: "/asp", subLinks: [
            {
              text: "Darsliklar",
              url: "/asp"
            },
            {
              text: "Ma'lumotnoma",
              url: "/asp/asp_ref_vbscript_functions"
            }
            ]
          },
          { text: "NodeJS", url: "/nodejs", subLinks: [
            {
              text: "Darsliklar",
              url: "/nodejs"
            },
            {
              text: "Ma'lumotnoma",
              url: "/nodejs/nodejs_ref_modules"
            }
            ]
          },
          { text: "Raspberry Pi", url: "/raspberrypi", subLinks: [
            {
              text: "Darsliklar",
              url: "/raspberrypi"
            },
            ]
          },
          { text: "Git", url: "/git", subLinks: [
            {
              text: "Darsliklar",
              url: "/git"
            }
            ]
          },
          { text: "MongoDB", url: "/mongodb", subLinks: [
            {
              text: "Darsliklar",
              url: "/mongodb"
            }
            ]
          },
          { text: "AWS Cloud", url: "/aws", subLinks: [
            {
              text: "Darsliklar",
              url: "/aws"
            }
            ]
          },
          { text: "XML", url: "/xml", subLinks: [
            {
              text: "Darsliklar",
              url: "/xml"
            },
            {
              text: "Ma'lumotnoma",
              url: "/xml/xml_dom_nodetypes"
            }
            ]
          },
        ]
      },
      {
        name: "Data Analytics",
        links: [
          { text: "AI", url: "/dsa", subLinks: [
            {
              text: "Darsliklar",
              url: "/ai"
            }
            ]
          },
          { text: "Generativ Ai", url: "/gen_ai", subLinks: [
            {
              text: "Darsliklar",
              url: "/gen_ai"
            }
            ]
          },
          { text: "ChatGPT-3.5", url: "/chatgpt-3.5", subLinks: [
            {
              text: "Darsliklar",
              url: "/chatgpt-3.5  "
            }
            ]
          },
          { text: "ChatGPT-4", url: "/chatgpt-4", subLinks: [
            {
              text: "Darsliklar",
              url: "/chatgpt-4"
            }
            ]
          },
          { text: "Google Bard", url: "/google-bard", subLinks: [
            {
              text: "Darsliklar",
              url: "/google-bard  "
            }
            ]
          },
          { text: "Machine Learning", url: "/machine-learning", subLinks: [
            {
              text: "Darsliklar",
              url: "/machine-learning"
            }
            ]
          },
          { text: "DSA", url: "/dsa", subLinks: [
            {
              text: "Darsliklar",
              url: "/dsa"
            }
            ]
          },
          { text: "Data Science", url: "/data-science", subLinks: [
            {
              text: "Darsliklar",
              url: "/data-science"
            }
            ]
          },
          { text: "Numpy", url: "/python/numpy", subLinks: [
            {
              text: "Darsliklar",
              url: "/numpy"
            }
            ]
          },
          { text: "Pandas", url: "/python/pandas", subLinks: [
            {
              text: "Darsliklar",
              url: "/pandas"
            }
            ]
          },
          { text: "SciPy", url: "/python/scipy", subLinks: [
            {
              text: "Darsliklar",
              url: "/scipy"
            }
            ]
          },
          { text: "Matplotlib", url: "/python/matplotlib", subLinks: [
            {
              text: "Darsliklar",
              url: "/matplotlib"
            }
            ]
          },
          { text: "Statistics", url: "/statistics", subLinks: [
            {
              text: "Darsliklar",
              url: "/statistics"
            }
            ]
          },
          { text: "Excel", url: "/excel", subLinks: [
            {
              text: "Darsliklar",
              url: "/excel"
            }
            ]
          },
          { text: "Google Sheets", url: "/googlesheets", subLinks: [
            {
              text: "Darsliklar",
              url: "/googlesheets"
            }
            ]
          },
        ]
      },
        {
          name: "Veb Dasturlash",
        links: [
          { text: "Sayt yaratish", url: "/create-website" },
          { text: "Server yaratish", url: "/create-server" },
          { text: "qayerdan boshlash kerak?", url: "/where-to-start" },
          { text: "Veb Shablonlar", url: "/w3css/w3css-templates" },
          { text: "Veb Statistikasi", url: "/browsers" },
          { text: "Veb Sertifikatlar", url: "https://campus.w3schools.com/" },
          { text: "Veb Dasturlash", url: "/whatis" },
          { text: "Kod Muharrir", url: "https://www.w3schools.com/tryit/default.asp" },
          { text: "Yozish tezligini tekshiring", url: "/typingspeed" },
          { text: "Kod o'yini o'ynash", url: "/code-game" },
          { text: "Kiber xavfsizlik", url: "/cyber-security" },
          { text: "Accessibility", url: "/accessibility" },
          { text: "Bizning Yangiliklar", url: "https://campus.w3schools.com/pages/newsletter" },
        ]
      }
    ]
  },

  Mashqlar: {
    title: "Mashqlar",
    items: [
      {
        name: "HTML va CSS",
        links: [
          { text: "HTML", url: "/html/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/html/exercises"
            },
            {
              text: "Test",
              url: "/html/html_quiz"
            }
            ]
          },
          { text: "CSS", url: "/css/css_exercises", subLinks: [
            {
              text: "Mashq",
              url: "/css/css_exercises"
            },
            {
              text: "Test",
              url: "/css/css_quiz"
            }
            ] },
          { text: "Bootstrap 3", url: "/bootstrap/bootstrap_exercise", subLinks: [
            {
              text: "Mashq",
              url: "/bootstrap/bootstrap_exercise"
            },
            {
              text: "Test",
              url: "/bootstrap/bootstrap_quiz"
            }
            ] },
          { text: "Bootstrap 4", url: "/bootstrap4/exercise", subLinks: [
            {
              text: "Mashq",
              url: "/bootstrap4/exercise"
            },
            {
              text: "Test",
              url: "/bootstrap4/bootstrap_quiz"
            }
            ] },
          { text: "Bootstrap 5", url: "/bootstrap5/exercise", subLinks: [
            {
              text: "Mashq",
              url: "/bootstrap5/exercise"
            },
            {
              text: "Test",
              url: "/bootstrap5/bootstrap_quiz"
            }
            ] },
        ]
      },
      {
        name: "JavaScript",
        links: [
          { text: "JavaScript", url: "/js/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/js/exercises"
            },
            {
              text: "Test",
              url: "/js/js_quiz"
            }
            ] },
          { text: "React", url: "/react/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/react/react_exercises"
            },
            {
              text: "Test",
              url: "/react/react_quiz"
            }
            ] },
          { text: "jQuery", url: "/jquery/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/jquery/jquery_exercises"
            },
            {
              text: "Test",
              url: "/jquery/jquery_quiz"
            }
            ] },
          { text: "Vue", url: "/vue/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/vue/vue_exercises"
            },
            {
              text: "Test",
              url: "/vue/vue_quiz"
            }
            ] },
        ]
      },
      {
        name: "Backend",
        links: [
          { text: "Python", url: "/python/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/python/python_exercises"
            },
            {
              text: "Test",
              url: "/python/python_quiz"
            }
            ] },
          { text: "SQL", url: "/sql/exercises", subLinks: [
            { 
              text: "Mashq",
              url: "/sql/sql_exercises"
            },
            {
              text: "Test",
              url: "/sql/sql_quiz"
            }
            ] },
          { text: "PHP", url: "/php/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/php/php_exercises"
            },
            {
              text: "Test",
              url: "/php/php_quiz"
            }
            ] },
          { text: "Java", url: "/java/exercises", subLinks: [
            { 
              text: "Mashq",
              url: "/java/java_exercises"
            },
            {
              text: "Test",
              url: "/java/java_quiz"
            }
            ] },
          { text: "C", url: "/c/exercises", subLinks: [
            { 
              text: "Mashq",
              url: "/c/c_exercises"
            },
            {
              text: "Test",
              url: "/c/c_quiz"
            }
            ] },
          { text: "C++", url: "/cpp/exercise", subLinks: [
            {
              text: "Mashq",
              url: "/cpp/cpp_exercises"
            },
            {
              text: "Test",
              url: "/cpp/cpp_quiz"
            }
            ] 
          },
          { text: "C#", url: "/cs/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/cs/cs_exercises"
            },
            {
              text: "Test",
              url: "/cs/cs_quiz"
            }
            ]
          },
          { text: "R", url: "/r/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/r/r_exercises"
            },
            {
              text: "Test",
              url: "/r/r_quiz"
            }
            ]
          },
          { text: "Django", url: "/django/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/django/django_exercises"
            },
            {
              text: "Test",
              url: "/django/django_quiz"
            }
            ]
          },
          { text: "PostreSQL", url: "/postgresql/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/postgresql/postgresql_exercises"
            },
            {
              text: "Test",
              url: "/postgresql/postgresql_quiz"  
            }
            ] 
          },
          { text: "TypeScript", url: "/typescript/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/typescript/typescript_exercises"
            },
            {
              text: "Test",
              url: "/typescript/typescript_quiz"
            }
            ]
          },
          { text: "Git", url: "/git/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/git/git_exercises"
            },
            {
                text: "Test",
              url: "/git/git_quiz"
            }
            ]
          },
          { text: "Go", url: "/go/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/go/go_exercises"
            }
            ] 
          },
          { text: "MongoDB", url: "/mongodb/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/mongodb/mongodb_exercises"
            },
            {
              text: "Test",
              url: "/mongodb/mongodb_quiz"
            }
            ]
          },
          { text: "AWS Cloud", url: "/aws/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/aws/aws_exercises"
            },
            {
              text: "Test",
              url: "/aws/aws_quiz"
            }
            ]
          },
        ]
      },
      {
        name: "Data Analytics",
        links: [
          { text: "DSA", url: "/dsa/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/dsa/dsa_exercises"
            },
            {
              text: "Test",
              url: "/dsa/dsa_quiz"
            }
            ]
          },
          { text: "Numpy", url: "/python/numpy/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/python/numpy/numpy_exercises"
            },
            {
              text: "Test",
              url: "/python/numpy/numpy_quiz"
            }
            ]
          },
          { text: "Pandas", url: "/python/pandas/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/python/pandas/pandas_exercises"
            },
            {
              text: "Test",
              url: "/python/pandas/pandas_quiz"
            }
            ]
          },

          { text: "Scipy", url: "/python/scipy/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/python/scipy/scipy_exercises"
            },
            {
              text: "Test",
              url: "/python/scipy/scipy_quiz"
            }
            ]
          },
          
          { text: "Excel", url: "/excel/exercises", subLinks: [
            {
              text: "Mashq",
              url: "/excel/excel_exercises"
            }
            ]
          },
        ]
      },
    ]
  },

  Sertifikatlar: {
    title: "Sertifikatlar",
    items: [
      {
        name: "HTML va CSS",
        links: [
          { 
            text: "HTML", 
            url: "https://campus.w3schools.com/collections/certifications/products/html-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/html-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/course-catalog/products/html-course"
              }
            ]
          },
          { 
            text: "CSS", 
            url: "https://campus.w3schools.com/collections/certifications/products/css-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/css-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/course-catalog/products/css-course"
              }
            ]
          },
          { 
            text: "Bootstrap", 
            url: "https://campus.w3schools.com/collections/certifications/products/bootstrap-3-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/bootstrap-3-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/single-courses/products/bootstrap-course"
              }
            ]
          },
          { 
            text: "Bootstrap 4", 
            url: "https://campus.w3schools.com/collections/certifications/products/bootstrap-4-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/bootstrap-4-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/single-courses/products/bootstrap-4-course"
              }
            ]
          },
          { 
            text: "Bootstrap 5", 
            url: "https://campus.w3schools.com/collections/certifications/products/bootstrap-5-certificate",
            subLinks: [ 
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/bootstrap-5-certificate"
              }
            ]
          },
        ]
      },
      {
        name: "JavaScript",
        links: [
          { 
            text: "JavaScript",
            url: "https://campus.w3schools.com/collections/certifications/products/javascript-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/javascript-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/single-courses/products/javascript-course"
              }
            ]
          },
          { 
            text: "React",
            url: "https://campus.w3schools.com/collections/certifications/products/react-js-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/react-js-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/single-courses/products/react-js-course"
              }
            ]
          },
          { 
            text: "jQuery",
            url: "https://campus.w3schools.com/collections/certifications/products/jquery-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/jquery-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/single-courses/products/jquery-course"
              }
            ]
          },
          { 
            text: "Vue",
            url: "https://campus.w3schools.com/products/vue-js-certification-exam",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/products/vue-js-certification-exam"
              }
            ]
          },
        ],
      },
      {
        name: "Backend",
        links: [
          { 
            text: "Python",
            url: "https://campus.w3schools.com/collections/certifications/products/python-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/python-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/single-courses/products/python-course"
              }
            ]
          },
          { 
            text: "SQL",
            url: "https://campus.w3schools.com/collections/certifications/products/sql-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/sql-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/single-courses/products/sql-course"
              }
            ]
          },
          { 
            text: "PHP",
            url: "https://campus.w3schools.com/collections/certifications/products/php-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/php-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/single-courses/products/php-course"
              }
            ]
          },
          { 
            text: "Java",
            url: "https://campus.w3schools.com/collections/certifications/products/java-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/java-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/single-courses/products/java-course"
              }
            ]
          },
          { 
            text: "C",
            url: "https://campus.w3schools.com/collections/certifications/products/c-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/c-certificate"
              }
            ]
          },
          { 
            text: "C++",
            url: "https://campus.w3schools.com/collections/certifications/products/c-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/c-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/course-catalog/products/c-course-1"
              }
            ]
          },
          { 
            text: "C#",
            url: "https://campus.w3schools.com/collections/certifications/products/c-certificate-1",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/course-catalog/products/c-course"
              }
            ]
          },
          { 
            text: "R",
            url: "https://campus.w3schools.com/collections/certifications/products/r-certificate",
            subLinks: [
              {
                text: "Course",
                url: "https://campus.w3schools.com/collections/certifications/products/r-certificate"
              }
            ]
          },
          { 
            text: "Django",
            url: "https://campus.w3schools.com/products/django-certification-exam",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/products/django-certification-exam"
              }
            ]
          },
          { 
            text: "TypeScript",
            url: "https://campus.w3schools.com/collections/certifications/products/typescript-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/typescript-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/products/learn-typescript"
              }
            ]
          },
          { 
            text: "XML",
            url: "https://campus.w3schools.com/collections/certifications/products/xml-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/xml-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/products/xml-course"
              }
            ]
          },
          { 
            text: "Cyber Security",
            url: "https://campus.w3schools.com/collections/certifications/products/cyber-security-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/cyber-security-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/single-courses/products/cyber-security-course"
              }
            ]
          },
          { 
            text: 'Accessability',
            url: "https://campus.w3schools.com/collections/certifications/products/accessibility-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/accessibility-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/single-courses/products/accessibility-course"
              }
            ]
          },
          { 
            text: "Pyhton Apps on AWS",   
            url: "https://campus.w3schools.com/collections/course-best-sellers/products/building-modern-python-apps-on-aws",
            subLinks: [
              {
                text: "Course",
                url: "https://campus.w3schools.com/collections/course-best-sellers/products/building-modern-python-apps-on-aws"
              }
            ]
          },
          { 
            text: "AWS Training", 
            url: "https://www.w3schools.com/training/aws/home/",
            subLinks: [
              {
                text: "Course",
                url: "https://www.w3schools.com/training/aws/home/"
              }
            ]
          },
        ],
      },

      // DATA ANALYTICS
      {
        name: "Data Analytics",
        links: [
          { 
            text: "DSA", 
            url: "https://campus.w3schools.com/products/dsa-certification-exam",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/products/dsa-certification-exam"
              }
            ]
          },
          {   
            text: "Data Analytics", 
            url: "https://campus.w3schools.com/products/data-analytics-program",
            subLinks: [
              {
                text: "Course",
                url: "https://campus.w3schools.com/products/data-analytics-program"
              }
            ]
          },
          { 
            text: "NumPy", 
            url: "https://campus.w3schools.com/products/numpy-certification-exam",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/products/numpy-certification-exam"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/products/numpy-course"
              }
            ]
          },
          { 
            text: "Pandas", 
            url: "https://campus.w3schools.com/products/pandas-certification-exam",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/products/pandas-certification-exam"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/products/pandas-course"
              }
            ]
          },
          { 
            text: "Excel", 
            url: "https://campus.w3schools.com/products/excel-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/products/excel-certificate"
              }
            ]
          },
          { 
            text: "Social Media", 
            url: "https://campus.w3schools.com/collections/course-best-sellers/products/social-media-marketing-course",
            subLinks: [
              {
                text: "Course",
                url: "https://campus.w3schools.com/collections/course-best-sellers/products/social-media-marketing-course"
              }
            ]
          },
        ],
      },
      {
        name: "Programs",
        links: [
          { 
            text: "Full Access", 
            url: "https://campus.w3schools.com/collections/course-catalog/products/w3schools-full-access-course",
          },
          { 
            text: "Front End", 
            url: "https://campus.w3schools.com/collections/certifications/products/front-end-certificate",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/front-end-certificate"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/single-courses/products/front-end-course"
              }
            ]
          },
          { 
            text: "Web Dev", 
            url: "https://campus.w3schools.com/collections/certifications/products/modern-web-development-certification",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/modern-web-development-certification"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/course-best-sellers/products/web-application-development-course"
              }
            ]
          },
          { 
            text: "Web Design", 
            url: "https://campus.w3schools.com/collections/certifications/products/web-design-certification",
            subLinks: [
              {
                text: "Sertifikatlar",
                url: "https://campus.w3schools.com/collections/certifications/products/web-design-certification"
              },
              {
                text: "Kurs",
                url: "https://campus.w3schools.com/collections/course-best-sellers/products/learn-web-design"
              }
            ]
          },
        ],
      }
    ],
  },

  Xizmatlar: {
    title: "Bizning Xizmatlar",
    info: "W3Schools yangi boshlanuvchilar va professionallar uchun har kuni millionlab odamlarga yangi ko'nikmalarni o'rganish va o'zlashtirishda yordam beradigan keng turdagi xizmatlar va mahsulotlarni taklif etadi.",
    links: [
      { 
        text: "Bepul Darsliklar", 
        url: "/tutorials", 
        sub: "1999 yildan beri millionlab foydalanuvchilarimiz kabi bepul darslarimizdan bahramand bo'ling"
      },
      { 
        text: "References", 
        url: "/references",
        sub: "Barcha mashhur dasturlash tillari haqida taqdim qilgan ma'lumotnomalarimizni o'rganing"
      },
      { 
        text: "Sayt Yaratish",
        url: "/exercises",
        sub: `W3Schools Space bilan o'zingizning shaxsiy saytingizni yarating - hech qanday sozlashlar talab qilinmaydi`
      },
      { 
        text: "Mashqlar", 
        url: "/certificates",
        sub: "Turli mashqlar orqali bilimlaringizni tekshiring"
      },
      { text: "Viktorinalar", 
        sub: "Bir nechta tanlovli savollar orqali bilimingizni tekshiring", 
        url: "/quizzes" 
      },
      { text: "Sertifikat Olish", 
        sub: "Bilimingizni hujjat bilan tasdiqlang", 
        url: "/certificates" 
      },
      { text: "Kirish / Avtorizatsiya", 
        sub: "W3Schools hisobingizni yaratish orqali o'rganish jarayoningizni kuzatib tajribangizni yaxshilang", 
        url: "/login" 
      },
      { text: "Pathfinder & Mening Texnologiyalarim", 
        sub: "O'rganish jarayoni va muvofaqiyatlarini kuzatib borish", 
        url: "/pathfinder" 
      },
      { text: "Upgrade", 
        sub: "PLUS foydalanuvchisi bo'ling va ajoyib afzalliklarga ega bo'ling", 
        url: "/plus" 
      },
      { text: "Qaydan boshlash kerak", 
        sub: "Qayerdan boshlashni bilmayapsizmi ? Bizning yo'l ko'rsatuvchimizdan foydalaning", 
        url: "/start" 
      },
      { text: "Kod muharriri (Sinab ko'ring)", 
        sub: "Kodni tahrirlang va brauzerda natijani ko'ring", 
        url: "/code-editor" 
      },
      { text: "Videolar", 
        sub: "HTML asoslarini, ajoyib va qiziqarli video darslar orqali o'rganing", 
        url: "/videos" 
      },
      { text: "Shablonlar", 
        sub: "Biz siz foydalanishingiz uchun moslashuvchan veb-sayt shablonlari to'plamini yaratdik - bu bepul!", 
        url: "/templates" 
      },
      { text: "Web Hosting", 
        sub: "Shaxsiy veb-saytingizni hostingga joylashtiring va uni W3Schools Spaces bilan ulashing", 
        url: "/web-hosting" 
      },
      { text: "Server yaratish", 
        sub: "Turli texnologiyalar bilan o'z serveringizni yarating", 
        url: "/create-server" 
      },
      { text: "Qanday qilinadi", 
        sub: "HTML, CSS va JavaScript uchun ko'plab kod to'plamlarini o'rganing", 
        url: "/how-tos" 
      },
      { text: "CSS Framework", 
        sub: "W3.CSS tizimimizdan foydalanib tez va moslashuvchan saytlar yarating", 
        url: "/css-framework" 
      },
      { text: "Brauzer statistikasi", 
        sub: "Brauzerdan foydalanish haqidagi uzluksiz trendlarni o'rganing", 
        url: "/browser-statistics" 
      },
      { text: "Yozish tezligi", 
        sub: "Yozish tezligingizni tekshiring", 
        url: "/typing-speed" 
      },
      { text: "AWS O'rgatish", 
        sub: "Amazon Web Servicesni o'rganing", 
        url: "/aws-training" 
      },
      { text: "Rang tanlash", 
        sub: "Turli RGB, HEX va HSL ranglarini toping", 
        url: "/color-picker" 
      },
      { text: "Kod o'yini", 
        sub: "Lynxning konuslarini to'plashga yordam bering", 
        url: "/code-game" 
      },
      { text: "Maqsad belgilash", 
        sub: "Mavjud ko'nikmalaringiz va maqsadlaringiz asosida o'zingizga mos ta'lim sayohatiga ega bo'ling", 
        url: "/set-goal" 
      },
      { text: "Yangiliklar", 
        sub: "Bizning yangiliklarimizga xush kelibsiz", 
        url: "/newsletter" 
      },
      { text: "O'qituvchilar uchun", 
        sub: "Ta'lim muassasalari uchun W3Schools Academy haqida biz bilan bog'laning", 
        url: "/for-teachers" 
      },
      { text: "Tashkilotlar uchun", 
        sub: "Tashkilotingiz uchun W3Schools Academy haqida biz bilan bog'laning", 
        url: "/for-businesses" 
      },
      { text: "Biz bilan bog'lanish", 
        sub: `Savolingiz bo'lsa: sales@w3schools.com, Xatoliklar bo'lsa: help@w3schools.com`,
        url: "/contact" 
      }
    ],
  },
};

export const stacks = [
  {
    id: id(),
    name: "HTML",
    path: '/html'
  },
  {
    id: id(),
    name: "CSS",
    path: '/css'
  },
  {
    id: id(),
    name: "JavaScript",
    path: '/js'
  },
  {
    id: id(),
    name: "SQL",
    path: '/sql'
  },
  {
    id: id(),
    name: "Python",
    path: '/python'
  },
  {
    id: id(),
    name: "Java",
    path: '/java'
  },
  {
    id: id(),
    name: "PHP",
    path: '/php'
  },
  {
    id: id(),
    name: "Qanday qilinadi",
    path: '/howto'
  },
  {
    id: id(),
    name: "W3.CSS",
    path: '/w3css'
  },
  {
    id: id(),
    name: "C",
    path: '/c'
  },
  {
    id: id(),
    name: "C++",
    path: '/cpp'
  },
  {
    id: id(),
    name: "C#",
    path: '/csharp'
  },
  {
    id: id(),
    name: "Bootstrap",
    path: '/bootstrap/bootstrap_ver'
  },
  {
    id: id(),
    name: "React",
    path: '/react'  
  },
  {
    id: id(),
    name: "MySQL",
    path: '/mysql'
  },
  {
    id: id(),
    name: "jQuery",
    path: '/jquery'
  },
  {
    id: id(),
    name: "Excel",
    path: '/excel'
  },
  {
    id: id(),
    name: "XML",
    path: '/xml'
  },
  {
    id: id(),
    name: "Django",
    path: '/django'
  },
  {
    id: id(),
    name: "NumPy",
    path: '/python/numpy'
  },
  {
    id: id(),
    name: "Pandas",
    path: '/python/pandas'
  },
  {
    id: id(),
    name: "Node.js",
    path: '/nodejs'
  },
  {
    id: id(),
    name: "R",
    path: '/r'
  },
  {
    id: id(),
    name: "TypeScript",
    path: '/typescript'
  },
  {
    id: id(),
    name: "Angular",
    path: '/angular'
  },
  {
    id: id(),
    name: "Git",
    path: '/git'
  },
  {
    id: id(),
    name: "PostgreSQL",
    path: '/postgresql'
  },
  {
    id: id(),
    name: "MongoDB",
    path: '/mongodb'
  },
  {
    id: id(),
    name: "ASP",
    path: '/asp'
  },
  {
    id: id(),
    name: "AI",
    path: '/ai'
  },
  {
    id: id(),
    name: "Go",
    path: '/go'
  },
  {
    id: id(),
    name: "Kotlin",
    path: '/kotlin'
  },
  {
    id: id(),
    name: "Sass",
    path: '/sass'
  },
  {
    id: id(),
    name: "Vue",
    path: '/vue'
  },
  {
    id: id(),
    name: "DSA",
    path: '/dsa'
  },
  {
    id: id(),
    name: "GenAI",
    path: '/genai'
  },
  {
    id: id(),
    name: "SciPy",
    path: '/scipy'
  },
  {
    id: id(),
    name: "AWS",
    path: '/aws'
  },
  {
    id: id(),
    name: "Cyber Security",
    path: '/cybersecurity'
  },
  {
    id: id(),
    name: "Data Science",
    path: '/datascience'
  }
]