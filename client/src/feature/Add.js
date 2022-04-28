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
  
  handleSubmit = event => {
    // Details of the uploaded file
    console.log(this.state.selectedFile);
    console.log(this.state.file)

    alert(`${this.state.disease}`)
    event.preventDefault()
  }

  // On file select (from the pop up)
  onFileChange = event => {

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  
  }

  // On file upload (click the upload button)
  // onFileUpload = () => {
    
    
  // };

  // File content to be displayed after
  // file upload is complete
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
      if (this.state.selectedFile.type == "text/plain") {
        text = this.state.file
      }

      return (
        <div>
          <h2>File Details:</h2>            
          <p>Nama File: {this.state.selectedFile.name}</p>
          <p>Tipe File: {this.state.selectedFile.type}</p>
          <p>Isi File : </p>
          <p>{text}</p>
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
        <div className=''>
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
            onChange={this.onFileChange}
          />
          {this.fileData()}
        </div>
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

export default Add