module.exports = (sequelize, DataTypes) => {

    let Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,  
        }, starID: {
            type: DataTypes.STRING,
        }, present: {
            type: DataTypes.BOOLEAN,
        }
    })

    // force specifies whether to drop the table or not
    // true = drop table every time app restarts. Need this setting if table schema changed.
    // false = keep table
    Student.sync({force: false}).then( () => {                   // Creates tables in database, "force" overwrites old database tables. True resets data/ false retains data
        console.log('synced student table')
    })

    return Student
}