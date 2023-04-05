
let size = 1;

cx = 300;
cy = 250;
cz = 100;


describe("rotateX", function () {

    it("поворот вокруг оси Х на зо градусов", function () {

        vertices = [
            [cx - size, cy - size, cz - size],
            [cx + size, cy - size, cz - size],
            [cx + size, cy + size, cz - size],
            [cx - size, cy + size, cz - size],
            [cx - size, cy - size, cz + size],
            [cx + size, cy - size, cz + size],
            [cx + size, cy + size, cz + size],
            [cx - size, cy + size, cz + size],
        ];


        let fovAngleX = 30;
        rotateX(fovAngleX * 0.01);


        assert.equal(vertices[0][0], 299);
        assert.equal(vertices[0][1], 249.34018371753572);
        assert.equal(vertices[0][2], 98.74914330421305);

        assert.equal(vertices[5][0], 301);
        assert.equal(vertices[5][1], 248.74914330421305);
        assert.equal(vertices[5][2], 100.65981628246426);
    });


    it("поворот вокруг оси Х на 45 градусов", function () {

        vertices = [
            [cx - size, cy - size, cz - size],
            [cx + size, cy - size, cz - size],
            [cx + size, cy + size, cz - size],
            [cx - size, cy + size, cz - size],
            [cx - size, cy - size, cz + size],
            [cx + size, cy - size, cz + size],
            [cx + size, cy + size, cz + size],
            [cx - size, cy + size, cz + size],
        ];


        let fovAngleX = 45;
        rotateX(fovAngleX * 0.01);


        assert.equal(vertices[0][0], 299);
        assert.equal(vertices[0][1], 249.53451843175856);
        assert.equal(vertices[0][2], 98.6645873635361);
    });
});


describe("rotateY", function () {

    it("поворот вокруг оси Y на 60 градусов", function () {

        vertices = [
            [cx - size, cy - size, cz - size],
            [cx + size, cy - size, cz - size],
            [cx + size, cy + size, cz - size],
            [cx - size, cy + size, cz - size],
            [cx - size, cy - size, cz + size],
            [cx + size, cy - size, cz + size],
            [cx + size, cy + size, cz + size],
            [cx - size, cy + size, cz + size],
        ];


        let fovAngle = 60;
        rotateY(fovAngle * 0.01);


        assert.equal(vertices[0][0], 299.73930685848535);
        assert.equal(vertices[0][1], 249);
        assert.equal(vertices[0][2], 98.61002191169528);
    });

    it("поворот вокруг оси Y на 125 градусов", function () {

        vertices = [
            [cx - size, cy - size, cz - size],
            [cx + size, cy - size, cz - size],
            [cx + size, cy + size, cz - size],
            [cx - size, cy + size, cz - size],
            [cx - size, cy - size, cz + size],
            [cx + size, cy - size, cz + size],
            [cx + size, cy + size, cz + size],
            [cx - size, cy + size, cz + size],
        ];


        let fovAngle = 125;
        rotateY(fovAngle * 0.01);


        assert.equal(vertices[7][0], 298.73569301824915);
        assert.equal(vertices[7][1], 251);
        assert.equal(vertices[7][2], 99.36633774303968);
    });

});

describe("rotateZ", function () {

    it("поворот вокруг оси Z на 90 градусов", function () {

        vertices = [
            [cx - size, cy - size, cz - size],
            [cx + size, cy - size, cz - size],
            [cx + size, cy + size, cz - size],
            [cx - size, cy + size, cz - size],
            [cx - size, cy - size, cz + size],
            [cx + size, cy - size, cz + size],
            [cx + size, cy + size, cz + size],
            [cx - size, cy + size, cz + size],
        ];


        let fovAngle = 90;
        rotateZ(fovAngle * 0.01);


        assert.equal(vertices[0][0], 300.1617169413568);
        assert.equal(vertices[0][1], 248.59506312210186);
        assert.equal(vertices[0][2], 99);
    });

    it("поворот вокруг оси Y на 75 градусов", function () {

        vertices = [
            [cx - size, cy - size, cz - size],
            [cx + size, cy - size, cz - size],
            [cx + size, cy + size, cz - size],
            [cx - size, cy + size, cz - size],
            [cx - size, cy - size, cz + size],
            [cx + size, cy - size, cz + size],
            [cx + size, cy + size, cz + size],
            [cx - size, cy + size, cz + size],
        ];


        let fovAngle = 75;
        rotateZ(fovAngle * 0.01);


        assert.equal(vertices[1][0], 301.41332762889715);
        assert.equal(vertices[1][1], 249.94994989114952);
        assert.equal(vertices[1][2], 99);
    });

});


