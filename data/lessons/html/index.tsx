import Basic from "@/components/Content/html/Basic";
import Editors from "@/components/Content/html/Editors";
import Home from "@/components/Content/html/Home";
import Introduction from "@/components/Content/html/Introduction";
import { LessonsContent } from "@/types/sidebar";
import {v4 as uuidv4} from 'uuid';

export const html: LessonsContent = [
  {
    id: uuidv4(),
    title: 'HTML Darsligi',
    lessons: [
      {
        id: uuidv4(),
        title: 'HTML Kirish',
        slug: 'html',
        href: '/html',
        content: <Home />
      },
      {
        id: uuidv4(),
        title: 'HTML Tanishuv',
        slug: 'html_intro',
        href: '/html/html_intro',
        content: <Introduction />
      },
      {
        id: uuidv4(),
        title: 'HTML Muharrirlar',
        slug: 'html_editors',
        href: '/html/html_editors',
        content: <Editors />
      },
      {
        id: uuidv4(),
        title: 'HTML Asoslari',
        slug: 'html_basic',
        href: '/html/html_basic',
        content: <Basic />
      },
      {
        id: uuidv4(),
        title: 'HTML Elementlar',
        slug: 'html_elements',
        href: '/html/html_elements'
      },
      {
        id: uuidv4(),
        title: 'HTML Atributlar',
        slug: 'html_attributes',
        href: '/html/html_attributes'
      },
      {
        id: uuidv4(),
        title: 'HTML Sarlavhalar',
        slug: 'html_headings',
        href: '/html/html_headings'
      },
      {
        id: uuidv4(),
        title: 'HTML Paragraflar',
        slug: 'html_paragraphs',
        href: '/html/html_paragraphs'
      },
      {
        id: uuidv4(),
        title: 'HTML Stillar',
        slug: 'html_styles',
        href: '/html/html_styles'
      },
      {
        id: uuidv4(),
        title: 'HTML Formatlash',
        slug: 'html_formatting',
        href: '/html/html_formatting'
      },
      {
        id: uuidv4(),
        title: 'HTML Iqtiboslar',
        slug: 'html_quotations',
        href: '/html/html_quotations'
      },
      {
        id: uuidv4(),
        title: 'HTML Izohlar',
        slug: 'html_comments',
        href: '/html/html_comments'
      },
      {
        id: uuidv4(),
        title: 'HTML Ranglar',
        slug: 'html_colors',
        subTutorial: true,
        href: '/html/html_colors',
        subTutorials: [
          {
            id: uuidv4(),
            title: 'Colors',
            slug: 'html_colors',
            href: '/html/html_colors'
          },
          {
            id: uuidv4(),
            title: 'RGB',
            slug: 'html_colors_rgb',
            href: '/html/html_colors_rgb'
          },
          {
            id: uuidv4(),
            title: 'HEX',
            slug: 'html_colors_hex',
            href: '/html/html_colors_hex'
          },
          {
            id: uuidv4(),
            title: 'HSL',
            slug: 'html_colors_hsl',
            href: '/html/html_colors_hsl'
          }
        ]
      },
      {
        id: uuidv4(),
        title: 'HTML CSS',
        slug: 'html_css',
        href: '/html/html_css'
      },
      {
        id: uuidv4(),
        title: 'HTML Havolalar',
        slug: 'html_links',
        subTutorial: true,
        href: 'html/html/html_links',
        subTutorials: [
          {
            id: uuidv4(),
            title: 'Havolalar',
            slug: 'html_links',
            href: '/html/html_links'
          },
          {
            id: uuidv4(),
            title: 'Havola Ranglari',
            slug: 'html_links_colors',
            href: '/html/html_links_colors'
          },
          {
            id: uuidv4(),
            title: 'Havola Bookmarklari',
            slug: 'html_links_bookmarks',
            href: '/html/html_links_bookmarks'
          }
        ]
      },
      {
        id: uuidv4(),
        title: 'HTML Rasmlar',
        slug: 'html_images',
        href: '/html/html_images',
        subTutorial: true,
        subTutorials: [
          {
            id: uuidv4(),
            title: 'Rasmlar',
            slug: 'html_images',
            href: '/html/html_images'
          },
          {
            id: uuidv4(),
            title: 'Rasm xaritalari',
            slug: 'html_images_imagemap',
            href: '/html/html_images_imagemap'
          },
          {
            id: uuidv4(),
            title: 'Orqafon rasmlar',
            slug: 'html_images_background',
            href: '/html/html_images_background'
          },
          {
            id: uuidv4(),
            title: 'Picture elementi',
            slug: 'html_images_picture',
            href: '/html/html_images_picture'
          }
        ]
      },
      {
        id: uuidv4(),
        title: 'HTML Favicon',
        slug: 'html_favicon',
        href: '/html/html_favicon'
      },
      {
        id: uuidv4(),
        title: 'HTML Sahifa Sarlavhasi',
        slug: 'html_page_title',
        href: '/html/html_page_title'
      },
      {
        id: uuidv4(),
        title: 'HTML Jadvallar',
        slug: 'html_tables',
        href: '/html/html_tables',
        subTutorial: true,
        subTutorials: [
          {
            id: uuidv4(),
            title: 'Jadvallar',
            slug: 'html_tables',
            href: '/html/html_tables'
          },
          {
            id: uuidv4(),
            title: 'Jadval chegaralari',
            slug: 'html_table_borders',
            href: '/html/html_table_borders'
          },
          {
            id: uuidv4(),
            title: 'Jadval o\'lchamlari',
            slug: 'html_table_sizes',
            href: '/html/html_table_sizes'
          },
          {
            id: uuidv4(),
            title: 'Jadval sarlavhalari',
            slug: 'html_table_headers',
            href: '/html/html_table_headers'
          },
          {
            id: uuidv4(),
            title: 'Padding & Spacing',
            slug: 'html_table_padding_spacing',
            href: '/html/html_table_padding_spacing'
          },
          {
            id: uuidv4(),
            title: 'Colspan & Rowspan',
            slug: 'html_table_colspan_rowspan',
            href: '/html/html_table_colspan_rowspan'
          },
          {
            id: uuidv4(),
            title: 'Jadvalni bezash',
            slug: 'html_table_styles',
            href: '/html/html_table_styles'
          },
          {
            id: uuidv4(),
            title: 'Jadval colgroup',
            slug: 'html_table_colgroup',
            href: '/html/html_table_colgroup'
          }
        ]
      },
      {
        id: uuidv4(),
        title: 'HTML Ro\'yxatlar',
        slug: 'html_lists',
        href: '/html/html_lists',
        subTutorial: true,
        subTutorials: [
          {
            id: uuidv4(),
            title: 'Ro\'yxatlar',
            slug: 'html_lists',
            href: '/html/html_lists'
          },
          {
            id: uuidv4(),
            title: 'Tartibsiz Ro\'yxatlar',
            slug: 'html_lists_unordered',
            href: '/html/html_lists_unordered'
          },
          {
            id: uuidv4(),
            title: 'Tartibli Ro\'yxatlar',
            slug: 'html_lists_ordered',
            href: '/html/html_lists_ordered'
          },
          {
            id: uuidv4(),
            title: 'Boshqa Ro\'yxatlar',
            slug: 'html_lists_other',
            href: '/html/html_lists_other'
          }
        ]
      },
      {
        id: uuidv4(),
        title: 'HTML Block & Inline',
        slug: 'html_block_inline',
        href: '/html/html_block_inline'
      },
      {
        id: uuidv4(),
        title: 'HTML Div',
        slug: 'html_div',
        href: '/html/html_div'
      },
      {
        id: uuidv4(),
        title: 'HTML Klasslar',
        slug: 'html_classes',
        href: '/html/html_classes'
      },
      {
        id: uuidv4(),
        title: 'HTML Id',
        slug: 'html_id',
        href: '/html/html_id'
      },
      {
        id: uuidv4(),
        title: 'HTML Iframes',
        slug: 'html_iframes',
        href: '/html/html_iframes'
      },
      {
        id: uuidv4(),
        title: 'HTML JavaScript',
        slug: 'html_javascript',
        href: '/html/html_javascript'
      },
      {
        id: uuidv4(),
        title: 'HTML Fayl Yo\'llari',
        slug: 'html_file_paths',
        href: '/html/html_file_paths'
      },
      {
        id: uuidv4(),
        title: 'HTML Head',
        slug: 'html_head',
        href: '/html/html_head'
      },
      {
        id: uuidv4(),
        title: 'HTML Layout',
        slug: 'html_layout',
        href: '/html/html_layout'
      },
      {
        id: uuidv4(),
        title: 'HTML Responsive',
        slug: 'html_responsive',
        href: '/html/html_responsive'
      },
      {
        id: uuidv4(),
        title: 'HTML Kompyuter kodi',
        slug: 'html_computercode',
        href: '/html/html_computercode'
      },
      {
        id: uuidv4(),
        title: 'HTML Semantika',
        slug: 'html_semantics',
        href: '/html/html_semantics'
      },
      {
        id: uuidv4(),
        title: 'HTML Uslublar Qo\'llanmasi',
        slug: 'html_style_guide',
        href: '/html/html_style_guide'
      },
      {
        id: uuidv4(),
        title: 'HTML Entitylar',
        slug: 'html_entities',
        href: '/html/html_entities'
      },
      {
        id: uuidv4(),
        title: 'HTML Belgilar',
        slug: 'html_symbols',
        href: '/html/html_symbols'
      },
      {
        id: uuidv4(),
        title: 'HTML Emojiler',
        slug: 'html_emojis',
        href: '/html/html_emojis'
      },
      {
        id: uuidv4(),
        title: 'HTML Kodlash Jadvali',
        slug: 'html_charset',
        href: '/html/html_charset'
      },
      {
        id: uuidv4(),
        title: 'HTML URL Kodlash',
        slug: 'html_url_encode',
        href: '/html/html_url_encode'
      },
      {
        id: uuidv4(),
        title: 'HTML vs XHTML',
        slug: 'html_xhtml',
        href: '/html/html_xhtml'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'HTML Formalar',
    lessons: [
      {
        id: uuidv4(),
        title: 'HTML Formalar',
        slug: 'html_forms',
        href: '/html/html_forms'
      },
      {
        id: uuidv4(),
        title: 'HTML Forma Atributlari',
        slug: 'html_form_attributes',
        href: '/html/html_form_attributes'
      },
      {
        id: uuidv4(),
        title: 'HTML Forma Elementlari',
        slug: 'html_form_elements',
        href: '/html/html_form_elements'
      },
      {
        id: uuidv4(),
        title: 'HTML Input Turlari',
        slug: 'html_input_types',
        href: '/html/html_input_types'
      },
      {
        id: uuidv4(),
        title: 'HTML Input Atributlari',
        slug: 'html_input_attributes',
        href: '/html/html_input_attributes'
      },
      {
        id: uuidv4(),
        title: 'Input Forma Atributlari',
        slug: 'input_form_attributes',
        href: '/html/input_form_attributes'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'HTML Grafikalar',
    lessons: [
      {
        id: uuidv4(),
        title: 'HTML Grafikalar',
        slug: 'html_graphics',
        href: '/html/html_graphics'
      },
      {
        id: uuidv4(),
        title: 'HTML Canvas',
        slug: 'html_canvas',
        href: '/html/html_canvas'
      },
      {
        id: uuidv4(),
        title: 'HTML SVG',
        slug: 'html_svg',
        href: '/html/html_svg'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'HTML Media',
    lessons: [
      {
        id: uuidv4(),
        title: 'HTML Media',
        slug: 'html_media',
        href: '/html/html_media'
      },
      {
        id: uuidv4(),
        title: 'HTML Video',
        slug: 'html_video',
        href: '/html/html_video'
      },
      {
        id: uuidv4(),
        title: 'HTML Audio',
        slug: 'html_audio',
        href: '/html/html_audio'
      },
      {
        id: uuidv4(),
        title: 'HTML Plaginlar',
        slug: 'html_plugins',
        href: '/html/html_plugins'
      },
      {
        id: uuidv4(),
        title: 'HTML YouTube',
        slug: 'html_youtube',
        href: '/html/html_youtube'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'HTML APIlar',
    lessons: [
      {
        id: uuidv4(),
        title: 'HTML APIlar',
        slug: 'html_apis',
        href: '/html/html_apis'
      },
      {
        id: uuidv4(),
        title: 'HTML Geolokatsiya',
        slug: 'html_geolocation',
        href: '/html/html_geolocation'
      },
      {
        id: uuidv4(),
        title: 'HTML Sudrab tashlash',
        slug: 'html_drag_drop',
        href: '/html/html_drag_drop'
      },
      {
        id: uuidv4(),
        title: 'HTML Web Storage',
        slug: 'html_web_storage',
        href: '/html/html_web_storage'
      },
      {
        id: uuidv4(),
        title: 'HTML Web Workers',
        slug: 'html_web_workers',
        href: '/html/html_web_workers'
      },
      {
        id: uuidv4(),
        title: 'HTML SSE',
        slug: 'html_sse',
        href: '/html/html_sse'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'HTML Misollar',
    lessons: [
      {
        id: uuidv4(),
        title: 'HTML Misollar',
        slug: 'html_examples',
        href: '/html/html_examples'
      },
      {
        id: uuidv4(),
        title: 'HTML Muharrir',
        slug: 'html_editor',
        href: '/html/html_editor'
      },
      {
        id: uuidv4(),
        title: 'HTML Quiz',
        slug: 'html_quiz',
        href: '/html/html_quiz'
      },
      {
        id: uuidv4(),
        title: 'HTML Mashqlar',
        slug: 'html_exercises',
        href: '/html/html_exercises'
      },
      {
        id: uuidv4(),
        title: 'HTML Vebsayt',
        slug: 'html_website',
        href: '/html/html_website'
      },
      {
        id: uuidv4(),
        title: 'HTML Intervyu Tayyorgarlik',
        slug: 'html_interview',
        href: '/html/html_interview'
      },
      {
        id: uuidv4(),
        title: 'HTML Bootcamp',
        slug: 'html_bootcamp',
        href: '/html/html_bootcamp'
      },
      {
        id: uuidv4(),
        title: 'HTML Sertifikat',
        slug: 'html_certificate',
        href: '/html/html_certificate'
      },
      {
        id: uuidv4(),
        title: 'HTML Xulosa',
        slug: 'html_summary',
        href: '/html/html_summary'
      },
      {
        id: uuidv4(),
        title: 'HTML Qulaylik',
        slug: 'html_accessibility',
        href: '/html/html_accessibility'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'HTML Reference',
    lessons: [
      {
        id: uuidv4(),
        title: 'HTML Tag Ro\'yxati',
        slug: 'html_tag_list',
        href: '/html/html_tag_list'
      },
      {
        id: uuidv4(),
        title: 'HTML Atributlar',
        slug: 'html_attributes_ref',
        href: '/html/html_attributes_ref'
      },
      {
        id: uuidv4(),
        title: 'HTML Global Atributlar',
        slug: 'html_global_attributes',
        href: '/html/html_global_attributes'
      },
      {
        id: uuidv4(),
        title: 'HTML Brauzer Qo\'llab-quvvatlash',
        slug: 'html_browser_support',
        href: '/html/html_browser_support'
      },
      {
        id: uuidv4(),
        title: 'HTML Hodisalar',
        slug: 'html_events',
        href: '/html/html_events'
      },
      {
        id: uuidv4(),
        title: 'HTML Ranglar',
        slug: 'html_colors_ref',
        href: '/html/html_colors_ref'
      },
      {
        id: uuidv4(),
        title: 'HTML Canvas Reference',
        slug: 'html_canvas_ref',
        href: '/html/html_canvas_ref'
      },
      {
        id: uuidv4(),
        title: 'HTML Audio/Video',
        slug: 'html_audio_video_ref',
        href: '/html/html_audio_video_ref'
      },
      {
        id: uuidv4(),
        title: 'HTML Doctypes',
        slug: 'html_doctypes',
        href: '/html/html_doctypes'
      },
      {
        id: uuidv4(),
        title: 'HTML Kodlash Jadvallari',
        slug: 'html_charset_ref',
        href: '/html/html_charset_ref'
      },
      {
        id: uuidv4(),
        title: 'HTML URL Kodlash',
        slug: 'html_url_encode_ref',
        href: '/html/html_url_encode_ref'
      },
      {
        id: uuidv4(),
        title: 'HTML Til Kodlari',
        slug: 'html_lang_codes',
        href: '/html/html_lang_codes'
      },
      {
        id: uuidv4(),
        title: 'HTTP Xabarlar',
        slug: 'http_messages',
        href: '/html/http_messages'
      },
      {
        id: uuidv4(),
        title: 'HTTP Metodlar',
        slug: 'http_methods',
        href: '/html/http_methods'
      },
      {
        id: uuidv4(),
        title: 'PX dan EM ga Konverter',
        slug: 'px_to_em_converter',
        href: '/html/px_to_em_converter'
      },
      {
        id: uuidv4(),
        title: 'Klaviatura Yorliqlari',
        slug: 'keyboard_shortcuts',
        href: '/html/keyboard_shortcuts'
      }
    ]
  }
]