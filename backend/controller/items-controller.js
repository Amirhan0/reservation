const Item = require('../model/items-model');

const getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        console.error("Ошибка при получении товаров:", error);
        res.status(500).json({ message: "Ошибка при получении товаров", error });
    }
};

const getItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findByPk(id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: "Товар не найден" });
        }
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении товара", error });
    }
};

const createItem = async (req, res) => {
    const { name, description, price, image } = req.body;  
    console.log(req.body)
    try {
        const newItem = await Item.create({
            name,
            description,
            price,
            image, 
        });
        console.log(newItem)
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Ошибка при создании товара:", error); 
        res.status(500).json({ message: "Ошибка при создании товара", error });
    }
};

const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;  
    console.log("Полученные данные", {name, description, price, image})
    try {
        const item = await Item.findByPk(id);
        if (item) {
            item.name = name;
            item.description = description;
            item.price = price;
            item.image = image; 
            console.log(item)
            await item.save(); 
            res.json(item);
        } else {
            res.status(404).json({ message: "Товар не найден" });
        }
    } catch (error) {
        res.status(500).json({ message: "Ошибка при обновлении товара", error });
    }
};

const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findByPk(id);
        if (item) {
            await item.destroy();
            res.json({ message: "Товар удален" });
        } else {
            res.status(404).json({ message: "Товар не найден" });
        }
    } catch (error) {
        res.status(500).json({ message: "Ошибка при удалении товара", error });
    }
};

module.exports = {
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    createItem
}
