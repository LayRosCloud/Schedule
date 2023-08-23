namespace MVVM.Scripts.Repositories.Interfaces;

internal interface ICrudRepository <T> : IDataReader<T>, IDataWriter<T>, IDataRemover
{
    //Здесь был Виталя и Сергей
}

