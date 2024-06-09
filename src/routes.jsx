import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterSupplier from "./components/Supplier/RegisterSupplier";
import AddressEdit from "./components/Supplier/SupplierEdit";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RegisterSupplier />} />
                <Route path="/edicao" element={<AddressEdit />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;