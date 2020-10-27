import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";
import { ICar } from "ICar";

let carAPI = "https://webapicar20190326034339.azurewebsites.net/api/cars";

let carDataContainer = document.getElementById("carData");
let carDataError = document.getElementById("carDataError");

document.getElementById("getCarDataButton").addEventListener("click", GetAllCars);

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