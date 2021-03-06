import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  getProductById,
  addShoppingCart,
  // combineStateCart,
  clearDetail,
  getShoppingCart,
  getAllRewies,
} from "../redux/actions/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BackBtn,
  DetailContainer,
  Content1,
  Content2,
  ContentDiv,
  BtnDiv,
  SizeDiv,
  AddBtn,
} from "../styles/Details";
import NavBar from "./NavBar";
import CartDetails from "./ShoppingCart/CarritoDetails";
import { toast } from "react-toastify";
import Modal from "./Modal/Modal";
import { useModal } from "./Modal/hooks/useModal";
import Footer from "./Footer";
import './Details.css'

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [number, setNumber] = useState(0);
  const params = useParams();
  let addres = params.id;
  const detail = useSelector((state) => state.details);
  const userInfo = useSelector((state) => state.userInfo);
  const cartDetail1 = useSelector((state) => state.shoppingCart);
  const stateReview = useSelector((state)=> state.All_Review)
  // console.log(cartDetail1)
  // const cartDetailRegisterUser = useSelector(
  //   (state) => state.shoppingCartUserRegister
  // );
  console.log("infoReview",stateReview?.data)

  const [isOpenCart, openCart, closeCart] = useModal(false);

  const [itemsCarts, setItemsCarts] = useState({
    id: "",
    quantity: [],
    sizes: "",
  });

  useEffect(() => {
    dispatch(getProductById(addres));
    setTimeout(() => {
      dispatch(getProductById(addres));
    }, 1000);
    dispatch(getShoppingCart());
    return () => {
     dispatch(clearDetail())
     setNumber(0)
    }

  }, []); //  eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // dispatch(getProductById(addres));
  }, [itemsCarts]); //  eslint-disable-line react-hooks/exhaustive-deps

  let product = {};
  if (detail !== undefined) {
    product = detail;
  }

  useEffect(() => {
    setItemsCarts({
      id: addres,
      // image: product.image,
      // price: product.price,
      // model: product.model,
    });
  }, [product]); //  eslint-disable-line react-hooks/exhaustive-deps

useEffect (()=>{
  
dispatch(getAllRewies(addres))
},[])

useEffect(() => {
 let valueStart =   total_Rating/ totalLength 
 if (valueStart){
 setNumber(Math.ceil(valueStart))}
 if (!valueStart){
  setNumber(0)}
}, [stateReview?.data])


//   useEffect(() => {
//     if (userInfo && cartDetail1) {
//       cartDetail1.forEach(e => {
         
//       dispatch(combineStateCart(  {
//         email: userInfo.email,
//             data: [{
//               sizes: e.sizes,
//               id: e.id,
//               quantity: 1,
//         }],
//       }));
//     })
// }}, []);

  // useEffect(() => {

  //   let talles = []
  //   if ( detail.sizes !== undefined){
  //     talles =  detail.sizes
  //   }

  // }, [])


  async function CargarCarrito() {
    if (itemsCarts.sizes === undefined ) {
      toast.warn("Complete size", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(addShoppingCart(itemsCarts));
      if (userInfo) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/orders/create`,
          {
            email: userInfo.email,
            data: [{
              sizes: itemsCarts.sizes,
              id: itemsCarts.id,
              quantity: 1,

            }],
          }
        );
      }

      // console.log("esto envias al carrito ", itemsCarts);

      toast.success("Product added successfully to cart!", {
        position: toast.POSITION.TOP_CENTER,
      });
      openCart();
    }
  }

  // function handleCantidad(e) {
  //   e.preventDefault();

  //   console.log(e.target.value);
  //   setItemsCarts({
  //     ...itemsCarts,
  //     quantity: 1,
  //   });
  // }
  function handleTalle(e) {
    // e.preventDefault()
    // console.log(e.target.value);
    // console.log(e.target.name);

    setItemsCarts({
      ...itemsCarts,
      sizes: e.target.value,
      quantity: 1,
    });
  }

  // const HandleDelete = () => {
  //   let reply = window.confirm("Are you sure do you want to delete this item?");
  //   if (reply === true) {
  //     try {
  //       axios({
  //         method: "delete",
  //         url: `${process.env.REACT_APP_API_URL}/admin/delete/${detail.id}`,
  //       });
  //       navigate("/");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  // let talles = [35, 36, 37, 38, 39, 40, 41, 42, 43];
function totalRating(){ 
let totalRating= 0
stateReview?.data?.forEach(e => {
  totalRating  +=  Number(e.rating)
});
return totalRating
}
let total_Rating= totalRating()

function total_length(){
  let total = stateReview?.data?.length
  return total
}
let totalLength = total_length()

function totalCommentary (){
  let total = stateReview?.data?.map( e=>  ({commentary:  e.commentary,
                                            rating: e.rating }  )  )
  return total
}
let arrayCommentary = totalCommentary()



  return (
    <DetailContainer>
      <NavBar />
     
      <BackBtn
        onClick={() => {
          navigate(-1);
        }}
      ></BackBtn>
  
      <ContentDiv>
        <Content2>
          <h3>Model:</h3>
          <h2>{detail.model}</h2>

          <div className="DivfijoStart">
            {Array(5)
              .fill()
              .map((_, index) =>
                number >= index + 1 ? (
                  <AiFillStar className="IconRewiueTop"
                    style={{ color: "orange" }}
                    // onClick={() => setNumber(1)}
                  />
                ) : (
                  <AiOutlineStar className="IconRewiueTop"
                    style={{ color: "orange" }}
                    // onClick={() => setNumber(1)}
                  />
                )
              )} <p className="opinion">{totalLength}</p> <p className="opinion"> opinions</p>
          </div>

          <SizeDiv>
          <h3>Price:</h3>
          <h2> ${detail.price}</h2>
          </SizeDiv>
          <div>
          {detail.porcentaje && (
            <SizeDiv>
              <h3>discount:</h3>
              <h2>{" "}{detail.porcentaje} %</h2>
              <h3> Now:</h3> 
              <h1>${detail.price -
                  Math.ceil((detail.price * detail.porcentaje) / 100)}{" "}
              </h1>
            </SizeDiv>
            
          )}
          </div>
          <SizeDiv>
          <h3>Gender:</h3>
          <h2> {detail.gender}</h2>
          </SizeDiv>

          <SizeDiv>
          {detail.CategName?.length > 0 ? <h3>Category:</h3> : null}
          {detail.CategName?.length > 0 ? <h2>{detail.CategName}</h2> : null}
          </SizeDiv>
          <SizeDiv>
            <h3>Sizes: </h3>
            {detail.sizes?.map((e) => (
              <button key={e.size} value={e.size} onClick={(evento) => handleTalle(evento)}>
                {e.size}
              </button>
            ))}
          </SizeDiv>
          <SizeDiv>
            <h3>selected sizes: </h3>
            <h2>{itemsCarts.sizes}</h2>
          </SizeDiv>
          {/* <StockDiv>
            <h3>Quantity: </h3>
            <StockSelect
              defaultValue="default"
              onChange={(e) => handleCantidad(e)}
            >
              <option value="1"> Quantity: </option>
              <option value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
            </StockSelect>
          </StockDiv> */}
          <h4>Description : {detail.description}</h4>

        </Content2>
        <Content1>
       
          <img src={detail.image} alt="img zapa" />
          
        </Content1>
       
      </ContentDiv>
      <BtnDiv>
        <AddBtn onClick={(e) => CargarCarrito(e)} >
          <h4>Add to Shopping Cart</h4>
        </AddBtn>
      </BtnDiv>
    
      <Modal isOpen={isOpenCart} closeModal={closeCart}>
        <CartDetails closeCart={closeCart} />
      </Modal>
      <hr/>
          { (number === 0 || number === "NaN" )?(null):  (<div className="ReviewDetailContainer" >  

          <h1>Product  Reviews</h1>
          <div className="ReviewChildrenContainer">  
          <h3>{number}</h3>
          <div className="childrenReview">
            {Array(5)
              .fill()
              .map((_, index) =>
                number >= index + 1 ? (
                  <AiFillStar className="ReviewIconChildren"
                    style={{ color: "orange" }}
                    // onClick={() => setNumber(1)}
                  />
                ) : (
                  <AiOutlineStar className="ReviewIconChildren"
                    style={{ color: "orange" }}
                    // onClick={() => setNumber(1)}
                  />
                )
              )}
              <p>Average between {totalLength} opinions</p>
          </div>
          </div>
                  <hr/>
                    <div>
                    {arrayCommentary?.map((e,index)=>
                      <div key={index}>
    {Array(5)
              .fill()
              .map((_, index) =>
                e.rating >= index + 1 ? (
                  <AiFillStar className="startCommentary"
                    style={{ color: "orange" }}
                    // onClick={() => setNumber(1)}
                  />
                ) : (
                  <AiOutlineStar className="startCommentary"
                    style={{ color: "orange" }}
                    // onClick={() => setNumber(1)}
                  />
                )
              )}

                     <h4 className="commentaryh4"> {e.commentary}  </h4>   
                         
                        </div>
                      )}
                    </div>
                    <hr/>   

          </div>)}
      <Footer/>


    </DetailContainer>
  );
};
export default Details;
