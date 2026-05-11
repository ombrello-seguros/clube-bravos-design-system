import logo1 from "../../imports/Logo_Bravos_300.png";
import logo2 from "../../imports/Logo_Bravos_72_.png";
import logo3 from "../../imports/Logo_Bravos_secundaria_300_.png";
import logo4 from "../../imports/Logo_Bravos_secundaria_72_.png";

export function LogoTest() {
  console.log('Logo 1:', logo1);
  console.log('Logo 2:', logo2);
  console.log('Logo 3:', logo3);
  console.log('Logo 4:', logo4);

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Teste de Logos</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded">
          <p className="text-sm mb-2">Logo Principal 300</p>
          <img src={logo1} alt="Logo Principal 300" className="h-24" />
        </div>
        <div className="bg-white p-4 rounded">
          <p className="text-sm mb-2">Logo Principal 72</p>
          <img src={logo2} alt="Logo Principal 72" className="h-12" />
        </div>
        <div className="bg-white p-4 rounded">
          <p className="text-sm mb-2">Logo Secundária 300</p>
          <img src={logo3} alt="Logo Secundária 300" className="h-24" />
        </div>
        <div className="bg-white p-4 rounded">
          <p className="text-sm mb-2">Logo Secundária 72</p>
          <img src={logo4} alt="Logo Secundária 72" className="h-12" />
        </div>
      </div>
    </div>
  );
}
