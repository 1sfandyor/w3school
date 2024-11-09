import { findCurrentAndAdjacentLessons } from '@/utils/navigation';
import W3Button from '@/components/w3components/button';
import { sourceSansPro } from '@/config/fonts';
import clsx from 'clsx';

interface NavigationProps {
  slug: string;
  technology: string;
}

export default function Navigation({ slug, technology }: NavigationProps) {
  const { previous, next } = findCurrentAndAdjacentLessons(slug, technology);

  return (
    <div className={clsx("flex gap-4 my-4 justify-between", sourceSansPro.className)}>
      {previous ? (
        <W3Button 
          className='py-2 text-[18px]  px-[19px] !rounded-md'
          href={previous.href}
          variant="primary"
        >
          Orqaga
        </W3Button>
      ) : (
        <W3Button 
          className='py-2 text-[18px]  px-[19px] !rounded-md'
          href="/"
          variant="primary"
        >
          Bosh sahifa
        </W3Button>
      )}

      {next && (
        <W3Button 
          className='py-2 text-[18px]  px-[19px] !rounded-md'
          href={next.href}
          variant="primary"
        >
          Keyingisi
        </W3Button>
      )}
    </div>
  );
}