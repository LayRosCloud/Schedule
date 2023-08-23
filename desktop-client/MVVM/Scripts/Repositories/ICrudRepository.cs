namespace MVVM.Scripts.Repositories
{
    internal interface ICrudRepository <T> : IDataReader<T>, IDataWriter<T>, IDataRemover<T>
    {
        //Здесь был Виталя и Сергей
    }
}
