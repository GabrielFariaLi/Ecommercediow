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
import {
  dummyTamanhos,
  dummyCores,
  categoriasNSubCategorias,
} from "../../dataSuporte";

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
  const [files, setFiles] = useState(null);
  const [cat, setCat] = useState("");
  const [subcat, setSubCat] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(inputs);
  };
  const handleCat = (e) => {
    setCat(e.target.value);
  };
  const handleSubCat = (e) => {
    setSubCat(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(files);

    // Array to store download URLs
    const downloadURLs = [];
    const storage = getStorage(app);

    // Function to upload a single files
    function uploadFile(file) {
      console.log("🚀 ~ file: NewProduct.jsx:79 ~ uploadFile ~ file:", file);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle upload progress if needed
        },
        (error) => {
          // Handle upload error
          console.error("Error uploading file:", error);
        },
        () => {
          // Handle successful upload
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Add the download URL to the array
            downloadURLs.push(downloadURL);

            console.log(downloadURLs.length);
            console.log(files.length);
            // If all file are uploaded, update Firestore document
            if (downloadURLs.length === files.length) {
              console.log(" É O NOSKir");

              const product = {
                ...inputs,
                img: downloadURLs,
                categories: cat,
                subCategories: subcat,
                variacoes: inputList,
              };
              addProduct(product, dispatch);
            }
          });
        }
      );
    }

    // Loop through selected files and upload them
    for (const file of files) {
      uploadFile(file);
    }
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
            multiple
            onChange={(e) => setFiles(e.target.files)}
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
          <label>Categorias</label>
          <select name="categories" onChange={handleCat}>
            <option value="Skate">Skate</option>
            <option value="Tênis">Tênis</option>
            <option value="Roupas">Roupas</option>
            <option value="Acessórios">Acessórios</option>
          </select>
        </div>
        {categoriasNSubCategorias.map((categoria, index) => {
          if (categoria.categoria === cat)
            return (
              <div key={index} className="addProductItem">
                <label>Subcategorias</label>
                <select name="subcategories" onChange={handleSubCat}>
                  {categoria.subcategorias.map((subCategoria, index) => {
                    return (
                      <option key={index} value={`${subCategoria.nome}`}>
                        {subCategoria.nome}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
        })}

        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Quais são as variações desse produto?</label>
          <p className="instrucoes">
            Porfavor informe a cor, o tamanho disponível para{" "}
            <b>essa específica cor</b> e a quantidade <b>dessa combinação</b>{" "}
            disponível!
          </p>
          {inputList.map((x, i) => {
            return (
              <div key={i}>
                <label style={{ fontSize: "14px" }}>Cor </label>
                <select onChange={(e) => handleInputChange(e, i)}>
                  <option disabled>---</option>
                  {dummyCores.map((node, index) => (
                    <option
                      key={index}
                      name="color"
                      className="d-flex align-items-center "
                    >
                      {" "}
                      {node}
                    </option>
                  ))}
                </select>

                <label style={{ fontSize: "14px" }}>Tamanho </label>
                <input
                  className="mr10"
                  type="text"
                  name="size"
                  placeholder="Introduza o tamanho!"
                  value={x.size}
                  onChange={(e) => handleInputChangeQuantidade(e, i)}
                />

                {/*    <select onChange={(e) => handleInputChange(e, i)}>
                  <option selected disabled>
                    ---
                  </option>
                  {dummyTamanhos.map((node) => (
                    <option name="size" className="d-flex align-items-center ">
                      {" "}
                      {node}
                    </option>
                  ))}
                </select> */}
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
              </div>
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
