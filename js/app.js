$(function(){
    
    const currentState = {
        sortColumn: 'id',
        sortOrder: 'asc',  // AKTUALNY STAN
        filter: "",
        page: 1,
        page_size: 20
    }
    
    const apiUrl = 'http://rt.ex7.pl/get-data';
    
    const generateUrl = () => apiUrl + '?' + $.param(currentState)
    
    const sortingMethods = [
        {name: 'Id', sortColumn: 'id'},
        {name: 'Symbol', sortColumn: 'acronym'},
        {name: 'Opis', sortColumn: 'name'}
    ]
    
    
    const buildItem = (item) => (
        `<tr>
            <td>${item.id}</td>    
            <td>${item.acronym}</td>    
            <td>${item.name}</td> 
         </tr>`
    )
    const buildList = (items) => items.map(buildItem) // iterowanie po headerach  
//    items.map(function(item) => { return buildItem(item)})
    const buildHeaderItem = (item) => {
        let sort = 'asc'; // domysle 
        
        if(item.sortColumn === currentState.sortColumn){
            sort = currentState.sortOrder === sort ? 'desc' : 'asc'  // skrócona wersja if i esle  
            currentState.sortOrder = sort  
        }
        
        
        return `<th>
            <a class="js-sort" href="${apiUrl}?sort_column=${item.sortColumn}&sort_order=${sort}&filter=${currentState.filter}">${item.name}</a>
               </th>`
    }
    
    const buildHeader = () => sortingMethods.map(buildHeaderItem)
    
    

    
    const getData = (url) => {

        $.ajax({
            type: 'POST',
            url: url,
            
            success: function(data, status, xhr){
                $('.js-results-list').empty().append(buildList(data))
                $('.js-results-header').empty().append(buildHeader())
            }, 

            error: function(wrong){
                alert("Problem z pobraniem danych");
            }
        })
    }
    
    getData(generateUrl());
        
    $(document).on('click', '.js-sort', function(e){ // ominięcie przeładowania do nowej strony przez onlcick. Przeniesienie nazwy klasy do funkcji 
        e.preventDefault();
        const url = $(this).attr("href")
        getData(url);  
    })
    

    $('.js-search-form').on('submit', function(e){
        e.preventDefault();
        currentState.filter = $('.js-search-form-filter').val()
        currentState.page = 1
        getData(generateUrl());   
    })
    
    $('.js-prev').on('click', function(e){
        e.preventDefault();
        if( currentState.page > 1){
            currentState.page--;
            
        }
        getData(generateUrl());
        
        
    })
   
    
     $('.js-next').on('click', function(e){
        e.preventDefault(); 
        currentState.page++; 
        getData(generateUrl());   
     })
    
    $('ul li').on('click', function(e){
    e.preventDefault(); 
    })
    
 $(function(){ 
    let i = 1; 
     
    $('.js-counter-page').html(i);
     
    $('.js-next').click(function(e){
       $('.js-counter-page').html(++i); 
    });
     
     $('.js-prev').click(function(e){
           if(i === 1){
         e.stopPropagation();        
     } else {
        $('.js-counter-page').html(--i); 
     } 
     });
     
});
})