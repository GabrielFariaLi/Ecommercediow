import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { dummyTamanhos, dummyCores } from "../../dataSuporte";

export default function NewProduct() {
  /* -------------------------------------------------------------------------- */
  /*                        Adicionar variações dinamicas                       */
  /* -------------------------------------------------------------------------- */
  const [inputList, setInputList] = useState([
    { color: "", size: "", quantity: "" },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const name = e.target.selectedOptions[0].getAttribute("name");
    const value = e.target.value;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    console.log(inputList);
  };
  const handleInputChangeQuantidade = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    console.log(inputList);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { color: "", size: "", quantity: "" }]);
  };
  /* -------------------------------------------------------------------------- */
  /*                                     FIM                                    */
  /* -------------------------------------------------------------------------- */
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const product = {
      ...inputs,
      img: "aaa",
      variacoes: inputList,
      categories: cat,
    };

    await addProduct(product, dispatch);
    return;
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat };
          addProduct(product, dispatch);
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Quais são as variações desse produto?</label>
          <p class="instrucoes">
            Porfavor informe a cor, o tamanho disponível para{" "}
            <b>essa específica cor</b> e a quantidade <b>dessa combinação</b>{" "}
            disponível!
          </p>
          {inputList.map((x, i) => {
            return (
              <>
                <label style={{ fontSize: "14px" }}>Cor </label>
                <select onChange={(e) => handleInputChange(e, i)}>
                  <option selected disabled>
                    ---
                  </option>
                  {dummyCores.map((node) => (
                    <option name="color" class="d-flex align-items-center ">
                      {" "}
                      {node}
                    </option>
                  ))}
                </select>

                <label style={{ fontSize: "14px" }}>Tamanho </label>
                <select onChange={(e) => handleInputChange(e, i)}>
                  <option selected disabled>
                    ---
                  </option>
                  {dummyTamanhos.map((node) => (
                    <option name="size" class="d-flex align-items-center ">
                      {" "}
                      {node}
                    </option>
                  ))}
                </select>
                <label style={{ fontSize: "14px" }}>Quantidade </label>
                <input
                  className="mr10"
                  type="number"
                  name="quantity"
                  placeholder="Introduza a quantidade disponivel para essa variação!"
                  value={x.quantity}
                  onChange={(e) => handleInputChangeQuantidade(e, i)}
                />

                <div className="btn-box">
                  {inputList.length !== 1 && (
                    <button
                      className="buttonVariacoesRemover"
                      type="button"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remover
                    </button>
                  )}
                  {inputList.length - 1 === i && (
                    <button
                      className="buttonVariacoesAdicionar"
                      type="button"
                      onClick={handleAddClick}
                    >
                      Adicionar
                    </button>
                  )}
                </div>
              </>
            );
          })}
          <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
