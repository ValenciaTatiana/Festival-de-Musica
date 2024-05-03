import { src, dest, watch, series} from 'gulp' //Importar de la carpeta Gulp, las funciones de src y dest
// series permite ejecutar varias tareas al mismo tiempo
import * as dartSass from 'sass' //Importar todo de la carpeta Sass
import gulpSass from 'gulp-sass' //Importar la función gulpSass de la carpeta gulp-sass

const sass = gulpSass(dartSass) // Compilar Sass utilizando Gulp y en donde econtrar las dependencias de Sass

export function js ( done ) {
    src('src/js/index.js')
        .pipe( dest('dist/js') )
    done()
}
export function css( done ) {
    src('src/scss/app.scss', {sourcemaps: true}) // Buscamos el archivo en laruta y una vez encontrado ...
    .pipe( sass() ) // Pasa aca y es compilado y luego ...
    .pipe( dest('dist/css', {sourcemaps: true}) ) // Es almacenado aca.

    done() // Para finalizar la ejecución de esta función
}

export function dev() {
    watch('src/scss/**/*.scss', css) // Cuando hayan cambios ejecuta la función css, con los * se hace referencia que todos los datos que tengan la exteción scss se ejecute la función.
    watch('src/js/**/*.js', css) 
}

export default series( js, css, dev ) // series inicia una tarea y la finaliza, inicia la otra y la finaliza

// por otro lado esta parallel que hace casi lo mismo que series, lo que cambia es que este las inicializa toda al mimo tiempo