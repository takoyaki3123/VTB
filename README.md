# Description
VTBグループ、メンバー、イベントなどの情報を集めるサイト。

# Useage
参考として、Laravelの公式ドキュメントの通り操作すれば、動けます。

`npm install && npm run build`

.envの資料は.env.exampleをコピーして変えます

コピーしたあと、laravelのvendorを生成し、APP KEYを作ります。

`composer install`

`php artisan key:generate`

完成したら、実際に実行します。
`composer run dev`

その後、アカウントを作り、権限を変えれば、色んな画像などを設置できます。
