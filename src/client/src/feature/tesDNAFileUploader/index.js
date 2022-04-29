import "./style.css";
import { useState } from "react";
import axios from "axios";
import {FindPenyakit} from "../TesDNAResult"

export const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [penyakit, setPenyakit] = useState(null);
    const [pengguna, setPengguna] = useState(null);
    const [hasil, setHasil] = useState(null);
    const [radio, setRadio] = useState("KMP");


    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onPenyakitChange = (e) => {
        setPenyakit(e.target.value);
    };

    const onPenggunaChange = (e) => {
        setPengguna(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        console.log(radio);

        data.append('file', file);
        data.append('penyakit', penyakit);
        data.append('pengguna', pengguna);
        data.append('radio', radio);

        axios.post('//localhost:3001/upload', data)
            .then((res) => {
                console.log(res.data);
                setHasil(res.data);
            })
            .catch( () => {
                console.error('Error');
                setHasil({
                    nama: pengguna,
                    isTrue: "Not found",
                    penyakit: penyakit
                });
            })
    };


    return (
        <div>
            <form method="post" action="#" id="#" onSubmit={onSubmit}>         
              <div class="form-group files">
                <label>Upload Your File </label>
                <input type="file" accept=".txt"  onChange={onFileChange} class="form-control" multiple=""/>
              </div>
                <div>
                    <input type="text" placeholder="Nama Pengguna"  onChange={onPenggunaChange} />
                    <input type="text" placeholder="Nama Penyakit"  onChange={onPenyakitChange} />
                </div>
                <div>
                    <label>KMP</label>
                    <input type='radio' checked={radio === "KMP"} onChange={() => {setRadio("KMP")}} />
                </div>
                <div>
                    <label>BM</label>
                    <input type='radio' checked={radio === "BM"} onChange={() => {setRadio("BM")}} />
                </div>

                <button>Submit</button>
            </form>



        <FindPenyakit hasil={hasil}/>
        </div>
        


    )
}