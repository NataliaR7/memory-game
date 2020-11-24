export default function card(isFront = false, set = 'cardSet1', picture = '1.png') {
    let content = `<img class="back" src="./img/${set}/${picture}"/>`
    let content2 = `<img src="./1123.gif"/>`
    let content3 = `<img src="https://img.icons8.com/dusk/64/000000/geometric-flowers.png"/>`
    let content1 = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    width="50" height="50"
    viewBox="0 0 172 172"
    style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g><path d="M144.2005,166.625h-1.075l-73.3795,-7.3745c-2.80853,-0.26631 -5.39503,-1.64126 -7.18674,-3.82037c-1.79171,-2.17911 -2.64081,-4.98259 -2.35926,-7.78963l11.825,-118.4865c0.52159,-5.4241 5.08589,-9.55992 10.535,-9.546h1.075l73.401,7.3315c2.83758,0.26472 5.44901,1.66096 7.24507,3.87367c1.79606,2.21271 2.62541,5.05546 2.30093,7.88683l-11.782,118.379c-0.52378,5.44887 -5.12572,9.59341 -10.5995,9.546z" fill="#ffeea3"></path><path d="M82.6245,18.5545v2.15h0.9675l73.358,7.3745c2.52673,0.23382 4.85569,1.46625 6.47022,3.42387c1.61454,1.95762 2.38115,4.47858 2.12978,7.00363l-11.8895,118.4435c-0.45578,4.88125 -4.55753,8.61012 -9.46,8.6h-0.9675l-73.3795,-7.3745c-2.52673,-0.23382 -4.85569,-1.46625 -6.47022,-3.42387c-1.61454,-1.95762 -2.38115,-4.47858 -2.12978,-7.00363l11.8465,-118.465c0.45578,-4.88125 4.55753,-8.61012 9.46,-8.6v-2.15M82.56,18.533c-6.00296,0.0045 -11.02408,4.5607 -11.61,10.535l-11.825,118.4865c-0.63743,6.41089 4.03884,12.12633 10.449,12.771l73.4655,7.3745h1.1825c5.99551,-0.0034 11.01376,-4.54771 11.61,-10.5135l11.868,-118.4865c0.63743,-6.41089 -4.03884,-12.12633 -10.449,-12.771l-73.401,-7.3315h-1.1825z" fill="#ba9b48"></path><path d="M44.4405,159.831c-4.87404,0.00113 -9.11793,-3.32828 -10.277,-8.0625l-28.4875,-115.627c-0.6882,-2.74025 -0.25623,-5.64177 1.20036,-8.0627c1.45659,-2.42093 3.81775,-4.16173 6.56114,-4.8373l71.6165,-17.63c2.74086,-0.7003 5.64803,-0.27356 8.07202,1.18487c2.42399,1.45843 4.1628,3.82703 4.82798,6.57663l28.4015,115.627c0.6882,2.74025 0.25623,5.64177 -1.20036,8.0627c-1.45659,2.42093 -3.81775,4.16173 -6.56114,4.8373l-71.6165,17.63c-0.8307,0.20082 -1.68238,0.30187 -2.537,0.301z" fill="#f78f8f"></path><path d="M87.591,6.45c4.35192,0.03299 8.12527,3.01801 9.159,7.2455l28.552,115.6055c0.60106,2.46382 0.19469,5.0656 -1.12905,7.22879c-1.32374,2.16318 -3.45553,3.70912 -5.92295,4.29521l-71.6165,17.63c-2.45221,0.60964 -5.04626,0.21754 -7.20874,-1.08963c-2.16248,-1.30717 -3.71531,-3.42177 -4.31526,-5.87637l-28.38,-115.6055c-1.25704,-5.10563 1.8611,-10.26402 6.966,-11.524l71.6165,-17.63c0.74569,-0.18431 1.51087,-0.27816 2.279,-0.2795M87.591,4.3c-0.94212,0.00168 -1.88059,0.11718 -2.795,0.344l-71.6165,17.63c-3.01633,0.72811 -5.6187,2.62707 -7.23233,5.27746c-1.61363,2.65039 -2.10575,5.83413 -1.36767,8.84804l28.5305,115.627c0.72293,3.01939 2.62089,5.62546 5.27279,7.24001c2.6519,1.61455 5.83846,2.10409 8.85271,1.35999l71.6165,-17.63c3.01633,-0.72811 5.6187,-2.62707 7.23233,-5.27746c1.61363,-2.65039 2.10575,-5.83413 1.36767,-8.84804l-28.552,-115.6915c-1.28356,-5.20547 -5.94763,-8.86756 -11.309,-8.8795z" fill="#c74343"></path></g></g></svg>`
    
    return `
    <div class = 'card-wrapper flip-right'>
    <div class = 'card'>
        ${content}
        <div class='front'></div>
    </div>
    </div>
    `;
}