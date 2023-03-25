import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { ProductDetails } from "@/components/Product";

const dummyData = {
  text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quasi porro distinctio veniam voluptates magnam optio iste nulla iure libero tempore aperiam tenetur earum placeat, iusto ratione! Totam, ducimus fugit!",
  img: "https://picsum.photos/id/1060/536/354",
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Header />
      <Main>
     This is main page
      </Main>

      <Footer />
    </div>
  );
};

export default Home;
