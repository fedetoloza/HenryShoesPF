import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect} from "react";
import { Link } from 'react-router-dom';
import { getProductById } from "../redux/actions/index"
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Details = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    let addres = params.id;
    const detail = useSelector((state) => state.details)
console.log(detail)


    useEffect(() => {

        dispatch(getProductById(addres))
    }, [])//  eslint-disable-line react-hooks/exhaustive-deps



    function CargarCarrito() {

    }

    const HandleDelete = () => {
        let reply = window.confirm("¿Seguro que desea eliminar el producto?");
        if (reply==true){
        try{
            axios({
                method: "delete",
                url:`http://localhost:3001/details/${detail.id}`
            })
        navigate("/");
        }catch(err){console.log(err)}
        }
    }

    return (

        <>

            <Link to="/" > Atras  </Link>
            <>
                <img src={detail.image} alt="imagen zapa " />
                <h4>{detail.model} </h4>
                <h2>${detail.price}</h2>
            </>
            <>
                <h2>{detail.gender}</h2>
                <p> {detail.description}</p>
            </>
            <button onClick={(e) => CargarCarrito(e)} > <h4>Agregar al carrito</h4></button>
            <div>
            <Link to={`/edit/${addres}`}>
                <button>Editar Producto</button>
            </Link>

            <button onClick={(e) => HandleDelete()}> Eliminar producto</button>
            
            </div>


        </>



    );


}

export default Details
