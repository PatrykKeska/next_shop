import { NewsCart } from "@/components/NewsCart";
import { NewsLetterForm } from "@/components/Newsletter/NewsletterForm";

const NewsPage = () => {
  return (
    <section className='bg-gray-50'>
      <div className='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center'>
        <div className='mx-auto max-w-xl text-center'>
          <NewsCart />
          <div className='mt-8 flex flex-col flex-wrap gap-4'>
            <NewsLetterForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsPage;
