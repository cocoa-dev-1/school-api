interface Exception {
  name: string;
  message: string;
}

class EntityNotFoundException implements Exception {
  public readonly name = 'EntityNotFoundException';
  public readonly message = 'entity not found';
}
