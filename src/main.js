
const hashMapData = JSON.parse(localStorage.getItem('hashMapData'))


const hashMap = hashMapData || [
    {
        logo: 'A',
        logoType: 'text',
        url:'https://www.acfun.cn'
    },
    {
        logo: 'B',
        logoType: 'image',
        url: 'https://www.bilibili.com'
    }

]

const removeHttpWWW = (url) => {
    return url.replace('https://','')
        .replace('http://')
        .replace('www.','')
        .replace(/\/.*/,'') //删除/开头的内容
}


const $siteList = $('.siteList')
const $last = $('.last')



const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">
                        ${node.logo}
                    </div>
                    <div class="link">${removeHttpWWW(node.url)}</div>
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </div>
                </div>
            </li>`).insertBefore($last)

        $li.on('click',()=> {
            window.open(node.url)
        })

        $li.on('click','.close',(e) => {
            e.stopPropagation()
            hashMap.splice(index,1)
            render()
        })


    })
}

render()

$('.addButton').on('click',() => {
    let url = window.prompt('请输入您要添加的网址')
    if(url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: removeHttpWWW(url)[0],
        logoType: 'text',
        url: url
    })
    render()
})


window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('hashMapData',string)
}

let input = true

$('.input').on('focus',() => {
    input = false
})

$('.input').on('blur',() => {
    input = true
})

$(document).on('keypress',(e) => {
    if(input) {
        const {key} = e
        for(let i = 0 ; i < hashMap.length ; i++) {
            if(hashMap[i].logo.toLowerCase() === key) {
                window.open(hashMap[i].url)
            }
        }
    }
})


