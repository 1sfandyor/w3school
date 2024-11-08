import { CodeSnippet2 } from '@/components/ui/CodeSnippet2'
import { Separator } from '@/components/ui/separator'
import Hint from '@/components/w3components/Hint'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Editors = () => {
  return (
    <div className="w-full text-gray-2">
      <Separator/>
      <p>HTMLni o&apos;rganishga oddiy matn muharriri ham yetadi.</p>

      {/* LEARN HTML WITH NOTEPAD */}
      <Separator/>
      <h2>HTMLni Notepad yoki TextEdit yordamida o&apos;rganamiz</h2>
      <p>Web-sahifalarni yaratish uchun boshqa ko&apos;p funksiyali murakkab matn tahrirlovchilaridan foydalanish mumkin.</p>
      <p>Ammo, HTMLni o&apos;rganishda oddiyroq Notepad (Windows) va TextEdit (Mac) kabi tahrirlovchilardan foydalanishingizni maslahat beramiz.</p>
      <p>HTMLni o&apos;rganishda oddiy matn muharrirlaridan foydalanish yaxshi usul ekanligiga ishonamiz</p>
      <p>Quyidagi qadamlar orqali Notepad yoki TextEdit bilan o&apos;zingizning birinchi web sahifangizni yarating.</p>

      {/* STEP 1 */}
      <Separator/>
      <h2>1-Qadam: Notepadni oching (PC)</h2>
      <p><strong>Windows 8 yoki undan yuqori:</strong></p>
      <p><b>Start Screen</b>ni oching (Ekraningizning pastki chap qismida windows logotipi turgan qism). U yerga <b>Netepad</b> deb yozing.</p>
      <p><strong>Windows 7 yoki undan kichik:</strong></p>
      <p><b>Start &gt; Programs &gt; Accessories &gt; Notepad</b> orqali oching.</p>

      {/* STEP 2 */}
      <Separator/>
      <h2>2-Qadam: Ba&apos;zi HTML kodlarini yozing</h2>
      <p>Quyidagi HTML kodni Notepadga yozing yoki nusxa oling.</p>
      <CodeSnippet2 syntax='html'>
        {`  <!DOCTYPE html>
  <html>
  <body>

  <h1>My First Heading</h1>

  <p>My first paragraph.</p>

  </body>
  </html>`}
      </CodeSnippet2>
      <Image alt="notepad" className="my-[18px" height={279} src="/img_notepad.png" width={482}/>
      <Separator/>

      {/* STEP 3 */}
      <Separator/>
      <h2>3-Qadam: Web sahifasini ko&apos;rish</h2>
      <p>Faylni kompyuteringizga saqlang. Notepad menyusida <b>File &gt; Save as</b> ni tanlang.</p>
      <p>Fayl nomini <b>&quot;index.html&quot;</b> deb yozing va encoding turini UTF-8 deb belgilang.</p>
      <Image alt="notepad" className="my-[18px" height={192} src="/img_saveas.png" width={631}/>
      <Hint margin warning>
        <p>
          <strong>Maslahat:</strong> .htm va .html fayl kengaytmalaridan foydalanishingiz mumkin. Bularning hech qanday farqi yo&apos;q.
        </p>
      </Hint>

      {/* STEP 4 */}
      <Separator/>
      <h2>4-Qadam: Brauzeringizda HTML sahifani ko&apos;ring</h2>
      <p>HTML faylni bruzeringiz orqali ochib ko&apos;ring (fayl ustiga 2 mara bosing yoki fayl usida sichqonchaning o&apos;ng tugmasini bosib, u yerdan &quot;Open with&quot; ni tanlang)</p>
      <p>Natija quyidagicha bo&apos;ladi:</p>
      <Image alt="Chrome brauzeri" className="my-[18px" height={361} src="/img_chrome_2.png" width={635}/>

      {/* ONLINE EDITOR */}
      <Separator/>
      <h2>W3Schoolsning Online Tahrirlovchisi - &quot;O&apos;zingiz sinab ko&apos;ring&quot;</h2>
      <p>Bizning bepul onlayn muharririmiz yordamida HTML kodlarni tahrirlashingiz va natijani brauzeringizda ko&apos;rishingiz mumkin.</p>
      <p>Bu kodni tezda sinab ko&apos;rmoqchi bo&apos;lganingizda mukammal vositadir. Shuningdek, u ranglarni va kodni saqlash va boshqalar bilan baham ko&apos;rish xususiyatiga ega:</p>
      <CodeSnippet2 buttonText="O'zingiz sinab ko'ring" href='https://www.w3schools.com/html/tryit.asp?filename=tryhtml_editors' syntax='html' title='Misol' >
        {`  <!DOCTYPE html>
  <html>
  <head>
  <title>Page Title</title>
  </head>
  <body>

  <h1>My First Heading</h1>

  <p>My first paragraph.</p>

  </body>
  </html>`}
      </CodeSnippet2>
      <p><b>
          Bu qanday ishlashini ko&apos;rish uchun &quot;O&apos;zingiz sinab ko&apos;ring&quot; tugmasini bosing.
      </b></p>

      {/* W3SCHOOLS MAYDONLARI */}
      <Separator/>
      <h2>W3Schools Spaces</h2>
      <p>
        Agar o&apos;z veb-saytingizni yaratmoqchi bo&apos;lsangiz va kodingizni onlayn saqlamoqchi bo&apos;lsangiz,{" "}
        <Link className="hover:green-1 font-semibold underline" href="/spaces">W3Schools Spaces</Link> deb nomlangan bepul <b>veb-sayt yaratuvchi</b>mizni sinab ko&apos;ring:
      </p>

    </div>
  )
}

export default Editors