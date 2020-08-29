const http = require( 'http' ) ;
const fs   = require('fs') ;
 
function flushFile( response, fileName ) {
    fs.readFile( fileName, (err, data) => {
        if( err ) {
            console.error( err ) ;
            return ;
        }
        response.end( data ) ;
    });
}
 
function serverFunction( request, response ) {

    var url = request.url.substr( 1 ) ;  // Убираем первый символ (/) из запроса
    var method = request.method.toUpperCase() ;

    if( url == "" ) {  // Пустой запрос (localhost/) - домашняя страница
        url = 'home.html' ;
    }
    if( url == "questions" ) {  // Пустой запрос (localhost/) - домашняя страница
        response.end( JSON.stringify(
            [
                {id:1 , txt: 'Простота понимания кода' },
                {id:2 , txt: 'Быстрота оформ ления кода, создания модулей' },
                {id:3 , txt: 'Простота создания основных элементов' },
                {id:4 , txt: 'Как бы вы оценили нарисованные мной смайлики' },
                {id:5 , txt: 'Считаете ли вы произведением искуства эти смайлики' },
                {id:6 , txt: 'Следите за водным балансом?' },
                {id:7 , txt: 'Играете в игры?' },
                {id:8 , txt: 'Оцените шрифты в этом задании' },
                {id:9 , txt: 'Оцените кнопку "Отправить"' }
            ]
        ) )
        return ;
    }
 
    if( fs.existsSync( url ) ) {
        flushFile( response, url ) ;
        return ;
    }

    
 
    response.end( "<h1>Gallery</h1>" ) ;
}
 
http.createServer( serverFunction ).listen( 88, () => {
    console.log( "Server starting..." ) ;
})