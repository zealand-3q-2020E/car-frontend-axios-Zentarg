import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";
import { ICar } from "ICar";

let carAPI = "http://localhost:54180/api/Cars";

let carDataContainer = document.getElementById("carData");
let carDataError = document.getElementById("carDataError");

document.getElementById("getCarDataButton").addEventListener("click", GetAllCars);

document.getElementById("getCarIDDataButton").addEventListener("click", GetCarByID);

document.getElementById("postCarButton").addEventListener("click", PostCar);

document.getElementById("deleteCarButton").addEventListener("click", DeleteCar);

document.getElementById("getCarByVendorButton").addEventListener("click", GetCarsByVendor);

document.getElementById("getCarByVendorAndPriceButton").addEventListener("click", GetCarsByVendorAndPrice);

document.getElementById("updateCarButton").addEventListener("click", UpdateOneCar);

function CreateCarListElement(car : ICar) {
    let li : HTMLLIElement = document.createElement("li");
    let liText : Text = document.createTextNode(`${car.id} | Vendor: ${car.vendor} | Model: ${car.model} | Price: ${car.price}`);
    li.appendChild(liText);
    return li;
}

function GetAllCars() {
    carDataError.innerText = "";
    axios.get<ICar[]>(carAPI).then((response : AxiosResponse<ICar[]>) => {
        console.log(response);
        carDataContainer.innerHTML = "";

        response.data.forEach((car : ICar) => {
            let newLI : HTMLLIElement = CreateCarListElement(car);
            carDataContainer.appendChild(newLI);
        });

    }).catch((error : AxiosError) => {
        console.log(error);
        carDataError.innerText = error.toJSON.toString();
    });
}

function GetCarByID() {
    let idEl = <HTMLInputElement> document.getElementById("getCarID");
    GetOneCar(idEl.value);
}

function GetOneCar(id : string) {
    axios.get<ICar>(carAPI + `/${id}`).then((response : AxiosResponse<ICar>) => {
        console.log(response);

        let newLI : HTMLLIElement = CreateCarListElement(response.data);
        carDataContainer.appendChild(newLI);

    }).catch((error : AxiosError) => {
        console.log(error);
        carDataError.innerText = error.toJSON.toString();
    });
}

function PostCar() {
    let Model : HTMLInputElement = <HTMLInputElement> document.getElementById("postCarModel");
    let Vendor : HTMLInputElement = <HTMLInputElement> document.getElementById("postCarVendor");
    let Price : HTMLInputElement = <HTMLInputElement> document.getElementById("postCarPrice");
    let car : ICar = {id: 0, model: Model.value, vendor: Vendor.value, price: +Price.value};
    PostOneCar(car);
}

function PostOneCar(car : ICar) {
    axios.post<ICar>(carAPI, car).then((response : AxiosResponse) => {
        GetAllCars();
    }).catch((error : AxiosError) => {
        console.log(error);
        carDataError.innerText = error.toJSON.toString();
    });
}

function DeleteCar() {
    let ID : HTMLInputElement = <HTMLInputElement> document.getElementById("deleteCarID");
    DeleteOneCar(+ID.value);
}

function DeleteOneCar(id : number) {
    axios.delete<ICar>(carAPI + `/${id}`).then((response : AxiosResponse) => {
        GetAllCars();
    }).catch((error : AxiosError) => {
        console.log(error);
        carDataError.innerText = error.toJSON.toString();
    });
}

function GetCarsByVendor() {
    let vendor : string = "";
    let vendorStringElement : HTMLInputElement = <HTMLInputElement> document.getElementById("getCarByVendor");
    vendor = vendorStringElement.value;
    axios.get<ICar[]>(carAPI + `/ByVendor/${vendor}`).then((response : AxiosResponse<ICar[]>) => {
        response.data.forEach(element => {
            carDataContainer.appendChild(CreateCarListElement(element));
        });
    })
}

function GetCarsByVendorAndPrice() {
    let vendor : string = "";
    let price : number = 0;
    let vendorElement : HTMLInputElement = <HTMLInputElement> document.getElementById("getCarByVendorAndPriceVendor")
    let priceElement : HTMLInputElement = <HTMLInputElement> document.getElementById("getCarByVendorAndPricePrice")
    vendor = vendorElement.value;
    price = +priceElement.value;
    console.log(carAPI + `/ByVendor/${vendor}/${price}`)
    axios.get<ICar[]>(carAPI + `/ByVendor/${vendor}/${price}`).then((response : AxiosResponse<ICar[]>) => {
        response.data.forEach(element => {
            carDataContainer.appendChild(CreateCarListElement(element));
        })
    })
}

function UpdateOneCar() {
    let id : number = 0;
    let vendor : string = "";
    let model : string = "";
    let price : number = 0;
    let idElement : HTMLInputElement = <HTMLInputElement> document.getElementById("updateCarID")
    let vendorElement : HTMLInputElement = <HTMLInputElement> document.getElementById("updateCarVendor")
    let modelElement : HTMLInputElement = <HTMLInputElement> document.getElementById("updateCarModel")
    let priceElement : HTMLInputElement = <HTMLInputElement> document.getElementById("updateCarPrice")
    id = +idElement.value;
    vendor = vendorElement.value;
    model = modelElement.value;
    price = +priceElement.value;
    axios.put<ICar>(carAPI + `/${id}`, <ICar>{id, vendor, model, price}).then((response : AxiosResponse) => {
        GetAllCars();
    }).catch((error : AxiosError) => {
        console.log(error);
        carDataError.innerText = error.toJSON.toString();
    });

}