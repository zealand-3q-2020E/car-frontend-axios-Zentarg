import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";
import { ICar } from "ICar";

let carAPI = "https://webapicar20190326034339.azurewebsites.net/api/cars";

let carDataContainer = document.getElementById("carData");
let carDataError = document.getElementById("carDataError");

document.getElementById("getCarDataButton").addEventListener("click", GetAllCars);

document.getElementById("getCarIDDataButton").addEventListener("click", GetCarByID);

document.getElementById("postCarButton").addEventListener("click", PostCar);

document.getElementById("deleteCarButton").addEventListener("click", DeleteCar);

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