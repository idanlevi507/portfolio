console.log('Starting up');

gProjects = [
    {
        "id": "1.ball-board",
        "name": "Capture That Balls",
        "title": "ball version of sneak",
        "desc": "lorem ipsum lorem ipsum lorem ipsum",
        "url": "projects/1.ball-board",
        "publishedAt": Date.now(),
        "labels": ["Matrixes", "keyboard events"],
    },

    {
        "id": "2.Mine-Sweeper",
        "name": "MineSweeper",
        "title": "Mine sweeper",
        "desc": "3 days project",
        "url": "projects/2.Mine-Sweeper",
        "publishedAt": Date.now(),
        "labels": ["Matrixes", "keyboard events"],
    },
    {
        "id": "3.touch-nums",
        "name": "Touch Numbers",
        "title": "Speed touch",
        "desc": "lorem ipsum lorem ipsum lorem ipsum",
        "url": "projects/3.touch-nums",
        "publishedAt":Date.now(),
        "labels": ["Matrixes", "keyboard events"],
    },

]


function initPage() {
    renderProjects();
    renderModel()

}

function renderProjects() {
    var idx = 0;
    var htmlstring = gProjects.map(function (proj) {
        idx++;
        return `        
        <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${idx}">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                <img class="img-fluid" src="projects/${proj.id}/img/Screenshot.png" alt="">
          </a>
                <div class="portfolio-caption">
                    <h4>${proj.name}</h4>
                    <p class="text-muted">${proj.title}</p>
                </div>
        </div>`
    })
    htmlstring.join('');
    document.getElementById('spot').innerHTML = htmlstring;
}

function renderModel() {
    var htmlstring = gProjects.map(function (proj,idx) {
        console.log(proj);
        return `<div class="portfolio-modal modal fade" id="portfolioModal${idx+1}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>${proj.name}</h2>
                    <p class="item-intro text-muted">${proj.desc}</p>
                    <img class="img-fluid d-block mx-auto" src="projects/${proj.id}/img/Screenshot.png" alt="">
                    <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
                      blanditiis
                      dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae
                      cupiditate,
                      maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                    <ul class="list-inline">
                      <li>Date: January 2017</li>
                      <li>Client: Threads</li>
                      <li>Category: Illustration</li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                      <i class="fa fa-times"></i>
                      Close Project</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    })
    htmlstring.join('');
    document.getElementById('modal-spot').innerHTML = htmlstring;
}


