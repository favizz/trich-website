import Banner from "./components/homeComponents/Banner";
import Desc from "./components/homeComponents/Desc";
import Info from "./components/homeComponents/Info";
import ViewProduct from "./components/homeComponents/ViewProduct";
import ViewServices from "./components/homeComponents/ViewServices";
import ViewAppointment from "./components/homeComponents/ViewAppointment";
import ViewContact from "./components/homeComponents/ViewContact";

export default function Home() {
  return (
    <main className="relative">
      <Banner/>
      <Desc/>
      <Info/>
      <ViewProduct/>
      <ViewServices/>
      <ViewAppointment/>
      <ViewContact/>
    </main>
  );
}
