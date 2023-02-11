const { sequelize } = require("../models");
let { Author, Movie, Cast, Genre } = require("../models");
const { trace } = require("../routers");
class DataController {
  static async FetchAllData(req, res, next) {
    try {
      let data = await Movie.findAll({
        include: [
          { model: Author, attributes: ["username", "role"] },
          { model: Genre, attributes: ["name"] },
          { model: Cast, attributes: ["name", "profilePict"] },
        ],
        order: [["id", "ASC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async FetchGenreData(req, res, next) {
    try {
      let data = await Genre.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async AddData(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let { data, cast } = req.body;
      let id = req.user.id;
      let { title, synopsis, rating, trailerUrl, imgUrl, genre } = data;
      let newMovie = await Movie.create(
        {
          title,
          synopsis,
          rating,
          trailerUrl,
          imgUrl,
          AuthorId: id,
          GenreId: genre,
        },
        { transaction: t }
      );
      let newCastList = cast.map((element) => {
        return {
          name: element.castName,
          MovieId: newMovie.id,
          profilePict: element.castImgUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
      await Cast.bulkCreate(newCastList, { transaction: t });
      await t.commit();
      res.status(201).json("add Data Success");
    } catch (error) {
      next(error);
      await t.rollback();
    }
  }
  static async deleteMovies(req, res, next) {
    try {
      let id = req.params.id;
      let findData = Movie.findByPk(id);
      if (!findData) {
        throw { name: "DATA_NOT_FOUND" };
      }
      await Movie.destroy({
        where: {
          id,
        },
      });
      res.status(200).json("Delete success");
    } catch (error) {
      next(error);
    }
  }
  static async deleteGenre(req, res, next) {
    try {
      let id = req.params.id;
      console.log(id);
      let findData = Genre.findByPk(id);
      if (!findData) {
        throw { name: "DATA_NOT_FOUND" };
      }
      console.log(findData);
      await Genre.destroy({
        where: {
          id,
        },
      });
      res.status(200).json("Delete success");
    } catch (error) {
      next(error);
    }
  }

  static async addGenre(req, res, next) {
    try {
      let { name } = req.body;
      await Genre.create({
        name,
      });
      res.status(201).json("Add Genre Success");
    } catch (error) {
      next(error);
    }
  }

  static async GenreByID(req, res, next) {
    try {
      let id = req.params.id;
      let findData = await Genre.findByPk(id);
      if (!findData) {
        throw { name: "DATA_NOT_FOUND" };
      }
      res.status(200).json(findData);
    } catch (error) {
      next(error);
    }
  }
  static async EditGenreData(req, res, next) {
    try {
      let id = req.params.id;
      console.log(id, req.body);
      // let findData = await Genre.findByPk(id);
      // if (!findData) {
      //   throw { name: "DATA_NOT_FOUND" };
      // }
      // await Genre.update(
      //   {
      //     name,
      //   },
      //   {
      //     where: {
      //       id,
      //     },
      //   }
      // );
      // res.status(200).json("edit Success");
    } catch (error) {
      next(error);
    }
  }
}
module.exports = DataController;
