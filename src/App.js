import { Component } from 'react';
import './App.css';

class App extends Component {
   
  state={count:[],count2:[],comment:[],id:0,active:false,activecomment:true}

  //  componentDidMount(){
  //  this.get_elements()
  //  }

  fetchPost=async()=>{
    const {id,count,comment,activecomment}=this.state
    if(activecomment){
    this.setState({count:[],comment:[],count2:[]},this.render)
    const response = await fetch(`http://127.0.0.1:8000/posts/${id}`);
    console.log(response)
        //const response2=await fetch('http://127.0.0.1:8000/comment/comment/');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        // if(!response2.ok){
        //   throw new Error('Network response was not ok')
        // }
        const result = await response.json();
      
        // const result2=await response2.json();
      this.setState({comment:result.comments_posts})
      
        const resultafter =this.getFormattedData(result)


        this.setState({count:resultafter,active:true,activecomment:false})

      }
      else{
        this.setState({activecomment:true,count:[],comment:[]})
      }
  }

  valuetrigger=(event)=>{
    const {id}=this.state
    this.setState({id:event.target.value},this.fetchPost)
  }

   getFormattedData = data => ({
    id: data.id,
    title:data.title,
    content:data.content,
    commentPost:data.comment_post
  })

  // getFormattedData2=data=>(
  //   {
  //     id:data.id,
  //     text:data.text,
  //   }
  // )
    
   

   get_elements=async() => {

    const {count}=this.state

    this.setState({count:[]})
    

      
        const response = await fetch('http://127.0.0.1:8000/posts/');
        const response2=await fetch('http://127.0.0.1:8000/comment/');
        //console.log(response.ok)
        if (!response.ok) {
  
          throw new Error('Network response was not ok.');
        }
        if(!response2.ok){

          throw new Error('Network response was not ok')
        }
        const result = await response.json();
        const result2=await response2.json();

        const resultafter = result.map(each =>
          this.getFormattedData(each),
        )



        // const resultcomment=result.comments_posts
        // console.log(resultafter
        // console.log(resultcomment)

        this.setState({count2:resultafter,comment:result2})
        

        
  
    
  }
   

  render(){
    const {count,count2,comment,active}=this.state
    

  return (
    <div className='Container1'>
      <div className='tablecontainer'>
    <h1 className='main-heading'>Table Related to the Posts and their related comments</h1>
    <div className='header-container'>
      <button onClick={this.get_elements} className='button1'>Post</button>
      <div className='inputcontainer'>
        <label id="input" className='label'>Enter the post that you want to fetch:</label>
        <input for="input" type='text' onChange={this.valuetrigger}/>
      </div>


      </div>
      
      <div className='innercontainer'>
      <table className="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Content</th>
        </tr>
      </thead>
      {active&&<tbody>
    
          <tr key={count.id}>
            <td>{count.id}</td>
            <td>{count.title}</td>
            <td>{count.content}</td>
          </tr>
      </tbody>}
      <tbody>
        {count2.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.title}</td>
            <td>{row.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    <div className='container2'>
      <table className='custom-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Text</th>
          
        </tr>
      </thead>
      <tbody>
        {comment.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
    </div>
  );
  }
}

export default App;
