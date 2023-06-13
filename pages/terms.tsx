interface TermsPageProps {}

const TermsPage = ({}: TermsPageProps) => {
  return (
    <section className='flex flex-col bg-gray-200 gap-5 items-start  p-10'>
      <h1 className='text-2xl self-center'>
        Terms and Conditions for E-commerce Shop
      </h1>
      <h2 className='text-lg underline'>1. Introduction</h2>
      <p>
        Welcome to our e-commerce shop. These terms and conditions outline the
        rules and regulations for the use of our website. By accessing this
        website, we assume you accept these terms and conditions in full. If you
        disagree with these terms and conditions or any part of these terms and
        conditions, you must not use our website.
      </p>
      <h2 className='text-lg underline'>2. Intellectual Property Rights</h2>
      <p>
        Unless otherwise stated, we or our licensors own the intellectual
        property rights in the website and material on the website. Subject to
        the license below, all these intellectual property rights are reserved.
      </p>
      <h2 className='text-lg underline'>3. License to Use Website</h2>
      <p>
        You may view, download for caching purposes only, and print pages from
        the website for your own personal use, subject to the restrictions set
        out below and elsewhere in these terms and conditions.
      </p>
      <p>You must not:</p>
      <ul>
        <li>
          Republish material from this website (including republication on
          another website);
        </li>
        <li>Sell, rent or sub-license material from the website;</li>
        <li>Show any material from the website in public;</li>
        <li>
          Reproduce, duplicate, copy or otherwise exploit material on our
          website for a commercial purpose;
        </li>
        <li>Edit or otherwise modify any material on the website.</li>
      </ul>
      <h2 className='text-lg underline'>4. Acceptable Use</h2>
      <p>
        You must not use our website in any way that causes damage to the
        website or impairment of the availability or accessibility of the
        website. You must not use our website in any way that is unlawful,
        illegal, fraudulent or harmful.
      </p>
      <h2 className='text-lg underline'>5. Limitations of Liability</h2>
      <p>
        We will not be liable to you (whether under the law of contract, the law
        of torts or otherwise) in relation to the contents of, or use of, or
        otherwise in connection with, this website for any direct, indirect,
        special or consequential loss.
      </p>
      <h2 className='text-lg underline'>6. Indemnity</h2>
      <p>
        You agree to indemnify us, our directors, officers, employees, and
        agents, from and against any claims, actions, suits or proceedings, as
        well as any and all losses, liabilities, damages, costs and expenses
        (including reasonable attorneys fees) arising out of or in connection
        with your use of our website.
      </p>
      <h2 className='text-lg underline'>7. Variation</h2>
      <p>
        We may revise these terms and conditions from time-to-time. The revised
        terms and conditions shall apply to the use of our website from the date
        of publication of the revised terms and conditions on our website.
      </p>
      <h2 className='text-lg underline'>8. Entire Agreement</h2>
      <p>
        These terms and conditions, together with our privacy policy, constitute
        the entire agreement between you and us in relation to your use of our
        website.
      </p>
      <h2 className='text-lg underline'>9. Governing Law and Jurisdiction</h2>
      <p>
        These terms and conditions shall be governed by and construed in
        accordance with the laws of [insert country]. Any disputes relating to
        these terms and conditions shall be subject to the exclusive
        jurisdiction of the courts of [insert country].
      </p>
    </section>
  );
};

export default TermsPage;
