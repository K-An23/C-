import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import cors from 'cors'
import router from './router.js'
import mysql from 'mysql2'
import pw from './mysql.js'

const app = express()
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.use(cors())
/*上面本来是想解决跨域问题的，结果发现不行，所以只能先用静态来写了*/
app.use(router)
/*app.use(express.static('E://software/runcode-main/client/test'))*/
app.use(express.static('./client'))
app.use('/option',express.static('./client'))
/*app.use('/option',express.static('E://software/runcode-main/client/test'))*/

app.use(jsonParser);
/*app.use('/node',express.static('E://software/runcode-main/client/node_modules/monaco-editor/min/vs'))*/




app.listen(64, () => {
	console.log('express server running at http://127.0.0.1:64')
})
