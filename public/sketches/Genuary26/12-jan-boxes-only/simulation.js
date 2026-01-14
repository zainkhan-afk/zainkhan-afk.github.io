class Simulation{
    constructor(dt){
        this.dt = dt;
        this.physics = new Physics(this.dt);
        this.renderer = new Renderer();
        this.planets = [];
    }


    AddPlanet(planet){
        append(this.planets, planet);
    }

    Step(){
        this.renderer.Render(this.planets);
        this.physics.Step(this.planets);
    }
}