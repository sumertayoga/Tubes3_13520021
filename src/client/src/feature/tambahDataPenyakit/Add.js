import axios from 'axios'
import React, { Component } from 'react'

class Add extends Component {
  constructor(props) {
    super(props)

    this.state = {
      disease: '',
      selectedFile: null,
      file: ''
    }
  }

  handleDiseaseChange = event => {
    this.setState({
      disease: event.target.value
    })
  }

  isValid = () => {
    let dna = this.state.file
    let result = true;
    for (let index = 0; index < dna.length; index++) {
      if (!(dna[index] === 'A' || dna[index] === 'G' || dna[index] === 'C' || dna[index] === 'T')) {
        result = false;
      }
    }
    return result;
  }
  
  handleSubmit = event => {
    // Details of the uploaded file
    
    if (this.isValid() === false) {
      alert("Error : Input sequence dna tidak valid!")
    } else {
      let disease = this.state.disease;
      let dna = this.state.file;
      
      console.log(disease);
      console.log(dna);
      axios.post('//localhost:3001/tambahpenyakit', 
      {disease, dna}
      ).then((res) => {
        alert("Berhasil menambahkan ke dalam database")
        console.log(res.data);
      }).catch((err) => {
        alert("Error : " + err)
      })

    }


    event.preventDefault()
  }

  // On file select (from the pop up)
  onFileChange = event => {

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  
  }
  
  fileData = () => {
  
    if (this.state.selectedFile) {
      const reader = new FileReader();
    
      reader.readAsText(this.state.selectedFile)
      reader.onload = () => (
        this.setState({file: reader.result})
      )

      reader.onerror = () => {
        console.log('file error', reader.error)
      }
      let text = ""
      let valid = ""
      if (this.state.selectedFile.type === "text/plain") {
        text = this.state.file
      }
      if (this.isValid() === false) {
        valid = "Input sequence dna tidak valid!"
      }

      return (
        <div class='upload'>
          <h2>File Details:</h2>            
          <p>Nama File: {this.state.selectedFile.name}</p>
          <p>Tipe File: {this.state.selectedFile.type}</p>
          <p>Isi File : </p>
          <p>{text}</p>
          <h2>{valid}</h2>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Pilih file dulu sebelum klik tombol submit!</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>
          Tambah Data Penyakit
        </h1>
        <div>
          <label>Nama Penyakit: </label>
          <input 
            type='text' 
            value={this.state.disease} 
            onChange={this.handleDiseaseChange}
          />
        </div>
        <div>
          <label>Pilih File: </label>
          <input
            type='file'
            accept=".txt"
            onChange={this.onFileChange}
          />
          {this.fileData()}
        </div>
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

export default Add;
