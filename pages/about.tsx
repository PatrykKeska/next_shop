const AboutPage = () => {
  return (
    <>
      <section className='bg-white'>
        <div className='mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
              Trusted by eCommerce Businesses
            </h2>

            <p className='mt-4 text-gray-500 sm:text-xl'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              dolores laborum labore provident impedit esse recusandae facere
              libero harum sequi.
            </p>
          </div>

          <div className='mt-8 sm:mt-12'>
            <dl className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
              <div className='flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center'>
                <dt className='order-last text-lg font-medium text-gray-500'>
                  Total Sales
                </dt>

                <dd className='text-4xl font-extrabold text-blue-600 md:text-5xl'>
                  $4.8m
                </dd>
              </div>

              <div className='flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center'>
                <dt className='order-last text-lg font-medium text-gray-500'>
                  Official Addons
                </dt>

                <dd className='text-4xl font-extrabold text-blue-600 md:text-5xl'>
                  24
                </dd>
              </div>

              <div className='flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center'>
                <dt className='order-last text-lg font-medium text-gray-500'>
                  Total Addons
                </dt>

                <dd className='text-4xl font-extrabold text-blue-600 md:text-5xl'>
                  86
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <section>
        <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
          <div className='max-w-3xl'>
            <h2 className='text-3xl font-bold sm:text-4xl'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
              alias doloribus impedit.
            </h2>
          </div>

          <div className='mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16'>
            <div className='relative h-64 overflow-hidden sm:h-80 lg:h-full'>
              <img
                alt='Party'
                src='https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80'
                className='absolute inset-0 h-full w-full object-cover'
              />
            </div>

            <div className='lg:py-16'>
              <article className='space-y-4 text-gray-600'>
                <p>
                  Welcome to Next Shop, your ultimate destination for all your
                  online shopping needs. At Next Shop, we strive to provide you
                  with a seamless and enjoyable shopping experience right from
                  the comfort of your own home.
                </p>

                <p>
                  With an extensive collection of products across various
                  categories, we offer a wide range of options to suit your
                  preferences and lifestyle. Whether you re looking for
                  fashion-forward clothing, trendy accessories, state-of-the-art
                  electronics, or home essentials, we have you covered.
                </p>

                <p>
                  Our team is dedicated to curating a diverse selection of
                  high-quality products from trusted brands, ensuring that you
                  have access to the latest trends and top-notch merchandise. We
                  prioritize customer satisfaction and go above and beyond to
                  deliver exceptional service, from fast and reliable shipping
                  to prompt customer support.
                </p>

                <p>
                  At Next Shop, we understand the importance of convenience and
                  security when it comes to online shopping. Our user-friendly
                  interface makes it effortless to browse through our catalog,
                  find exactly what you re looking for, and make secure
                  transactions. Rest assured that your personal information is
                  handled with the utmost confidentiality and protected through
                  advanced security measures.
                </p>

                <p>
                  Stay up-to-date with the latest deals, promotions, and new
                  arrivals by subscribing to our newsletter or following us on
                  social media. We regularly update our inventory to provide you
                  with fresh and exciting options every time you visit.
                </p>

                <p>
                  Thank you for choosing Next Shop as your go-to ecommerce shop.
                  We are committed to exceeding your expectations and making
                  your online shopping experience truly exceptional. Start
                  exploring our collection today and discover the joy of
                  shopping at your fingertips.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
