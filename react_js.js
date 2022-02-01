function Book(props) {
    if(props.book.filter === true){
    return(
        <div className="card" onClick={props.AddCard} >
            <img className="card-img" src={"img/"+props.book.cover}></img>
            <p>{props.book.name}</p>
            <p>{props.book.author}</p>
            <p>{props.book.category}</p>
            <p>{props.book.publishing}</p>
            <p>{props.book.price}</p>
        </div>
    
    )
    } else {
        return null;
    }
}


function BuyBook(props) {
    if(props.edit_n == props.book.name) {
        return(
        
            <div className="buy_card" >
                <p>Название : {props.book.name}</p>
                <p>Автор : {props.book.author}</p>
                <p>Категория : {props.book.category}</p>
                <p>Публикация : {props.book.publishing}</p>
                <p>Цена : {props.book.price}</p>
                <p>Количество<input 
                type="text" 
                value={props.book.count} 
                onChange={props.titleChangeHandler} /></p>
                <button onClick={props.EditProductInput}>Изменить</button>
                <button onClick={props.Remove}>Удалить</button>
            </div>
        )
    }
    else {
        return(
        
            <div className="buy_card" >
                <p>Название : {props.book.name}</p>
                <p>Автор : {props.book.author}</p>
                <p>Категория : {props.book.category}</p>
                <p>Публикация : {props.book.publishing}</p>
                <p>Цена : {props.book.price}</p>
                <p>Количество {props.book.count};</p>
                <button onClick={props.EditProduct}>Изменить</button>
                <button onClick={props.Remove}>Удалить</button>
            </div>
        )
    }
}

class App extends React.Component {
    state={
        books: [
            {filter:true,name: 'Метро 3 в 1', cover : 'metro_all.jpg', author : 'Дмитрий Глуховский', publishing : 'ACT', category : 'роман', price : 20},
            {filter:true,name: 'Ведьмак все части', cover : 'Witcher_all.jpg', author : 'Анджей Сапковский', publishing : 'ACT', category : 'роман', price : 50},
            {filter:true,name: 'Песнь льда и пламени', cover : 'Игра_Престолов.jpg', author : 'Джордж Р. Р. Мартин', publishing : 'ACT', category : 'роман', price : 20},
            {filter:true,name: 'Метро 2035', cover : 'Метро_2035.jpg', author : 'Дмитрий Глуховский', publishing : 'ACT', category : 'роман', price : 15},
            {filter:true,name: 'Темная башня', cover : 'темная_башня.jpg', author : 'Стивен Кинг', publishing : 'ACT', category : 'ужасы', price : 20},
            {filter:true,name: 'Шерлок Холмс', cover : 'Шерлок-Холмс.jpg', author : 'Артур Конан Дойл', publishing : 'ACT', category : 'детектив', price : 50},    
        ],
        buybooks : [
            {filter:true,name: 'Шерлок Холмс', cover : 'Шерлок-Холмс.jpg', author : 'Артур Конан Дойл', publishing : 'ACT', category : 'детектив', price : 50, count : 1, basket:true},    
        ],
        count : 1,
        edit_n : ""
    }

    renderBooks() {
        return this.state.books.map( book => {
            
                return (
                    <Book 
                    book={book} 
                    key={book.name+Math.random()}
                    AddCard = {()=>this.AddCard(book)}
                   />
                )
        })
    }

    renderBuyBooks() {
        return this.state.buybooks.map( book => {
            
                return (
                    <BuyBook 
                    book={book} 
                    key={book.name+Math.random()}
                    edit_n={this.state.edit_n}
                    Remove={this.Remove.bind(this, book.name, book.count)}
                    EditProduct = {this.EditProduct.bind(this, book.name)}
                    EditProductInput = {this.EditProduct.bind(this,)}
                    titleChangeHandler = {(event)=>this.titleChangeHandler(event.target.value,book.name)}
                    />
                )
        })
    }

    titleChangeHandler(count,name) {
        this.setState({
            buybooks: this.state.buybooks.map(item2 => ({
                name: item2.name,
                cover : item2.cover, 
                author : item2.author, 
                publishing : item2.publishing, 
                category :  item2.category,
                price : item2.name == name ? (parseInt(item2.price)/parseInt(item2.count)) * parseInt(count) : item2.count,
                filter: item2.filter,
                basket: item2.basket,
                count: item2.name == name ? count : item2.count
            }))
        });
        let col = 0;

        this.state.buybooks.forEach(item =>{
            if(item.name == name) {
                col += parseInt(count);
            } else {
                col += parseInt(item.count);
            }
        })
            
        this.setState({
            count : col
        })
    }

    Remove(name, count_){
        let i = 0;
        let idx = -1;
        while (idx != -1) {
            idx = this.state.buybooks[i].name == name ? i++ : -1;
          }
          this.state.buybooks.splice(idx, 1);

          this.setState({
            count : this.state.count -= count_
        })
          
        this.setState({
            buybooks: this.state.buybooks.map(item => item)
        })
        
    }

    EditProduct(name){
        
        this.setState({
            edit_n : name
        })
    }

    EditProductInput(){      
        this.setState({
            edit_n : "",
        })
    }

    AddCard(book) {
            
                let new_book = Object.assign(book,{count:1,basket:true});
                let answer = false;
                this.state.buybooks.forEach(item=>{
                    console.log(item.name);
                    if(item.name == book.name) {
                        answer = true;

                    }
                })

                this.setState({
                    count : this.state.count += 1 
                })

                if(!answer) {
                    this.setState({buybooks: [ ...this.state.buybooks, new_book] });
                } else {
                    this.setState({
                        buybooks: this.state.buybooks.map(item2 => ({
                            name: item2.name,
                            cover : item2.cover, 
                            author : item2.author, 
                            publishing : item2.publishing, 
                            category :  item2.category,
                            price : item2.name == book.name ? item2.price + book.price : item2.price,
                            filter: item2.filter,
                            basket: item2.basket,
                            count: item2.name == book.name ? parseInt(item2.count) + 1 : parseInt(item2.count)
                        }))
                    });
                }
            
  
    }

    onFilterCategory(category){
            this.setState({
                books: this.state.books.map(item => ({
                    name: item.name,
                    cover : item.cover, 
                    author : item.author, 
                    publishing : item.publishing, 
                    category :  item.category,
                    price : item.price,
                    filter: item.category === category ||  category == null? true : false
                }))
            });
    }

    render() {
        return (
            <div className="app">
                <div className="all_but_cat">
                <button className="but" onClick={()=>this.onFilterCategory("ужасы")} >Ужасы</button>
                <button className="but" onClick={()=>this.onFilterCategory("роман")}>Роман</button>
                <button className="but" onClick={()=>this.onFilterCategory("детектив")}>Детектив</button>
                <button className="but" onClick={()=>this.onFilterCategory(null)}>По умолчанию</button>
                </div>
                <hr></hr>
                <div className="list">
                    {this.renderBooks()}
                </div>
                <hr></hr>
                <h1> Количество {this.state.count}</h1>
                <div className="list_buy">
                    {this.renderBuyBooks()}
                </div>


            </div>

        )
    }
}



ReactDOM.render(<App />,document.getElementById("root"));
